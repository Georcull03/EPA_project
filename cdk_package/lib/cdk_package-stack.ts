import {Stack, StackProps} from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origin from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cloudtrail from 'aws-cdk-lib/aws-cloudtrail'
import * as sns from 'aws-cdk-lib/aws-sns'
import * as logs from 'aws-cdk-lib/aws-logs';
import * as path from 'path';
import * as route53 from 'aws-cdk-lib/aws-route53';
import {Construct} from 'constructs';

export class CdkPackageStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const table = new ddb.Table(this, 'qwizgurus_interview_table', {
            tableName: 'qwizgurus_interview_table',
            partitionKey: {
                name: 'Job Level',
                type: ddb.AttributeType.STRING,
            },
            sortKey: {
                name: 'Question',
                type: ddb.AttributeType.STRING
            }
        });

        const getFunction = new lambda.Function(this, 'Function', {
            runtime: lambda.Runtime.PYTHON_3_9,
            handler: 'get_index.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, 'lambdaHandler')),
        });

        const version = getFunction.currentVersion;
        const alias = new lambda.Alias(this, 'GetFunctionLambdaAlias', {
            aliasName: 'Prod',
            version,
        });

        if (getFunction.role === null) {
            throw new Error('Lambda function role cannot be null');
        }

        getFunction.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'))

        getFunction.addEnvironment("TABLE_NAME", table.tableName)

        table.grantReadWriteData(getFunction)

        const putFunction = new lambda.Function(this, 'putFunction', {
            runtime: lambda.Runtime.PYTHON_3_9,
            handler: 'index.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, 'put-lambda-handler')),
        });

        const put_version = getFunction.currentVersion;
        const put_alias = new lambda.Alias(this, 'PutFunctionLambdaAlias', {
            aliasName: 'Prod',
            version,
        });

        if (putFunction.role === null) {
            throw new Error('Lambda function role cannot be null');
        }

        putFunction.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'))

        putFunction.addEnvironment("TABLE_NAME", table.tableName)

        table.grantReadWriteData(putFunction)

        const bucket = new s3.Bucket(this, 'epa-bucket', {
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        });
        
        const oai = new cloudfront.OriginAccessIdentity(this, 'epa-oai');

        bucket.grantRead(oai);

        const distribution = new cloudfront.Distribution(this, 'epa_cloudfront', {
          defaultBehavior: { 
            origin: new origin.S3Origin(bucket, {
              originAccessIdentity: oai,
          }),
        }});

        const api = new apigateway.RestApi(this, 'epa-api', {
            restApiName: 'epa-api'
        });

        const putlambdaintegration = new apigateway.LambdaIntegration(putFunction);
        const getlambdaintegration = new apigateway.LambdaIntegration(getFunction);
        
        const putresource = api.root.addResource("put");
        putresource.addMethod("PUT", putlambdaintegration);
        
        const getresource = api.root.addResource("get");
        getresource.addMethod("GET", getlambdaintegration);


        const topic = new sns.Topic(this, 'APIEvents')
        const trail = new cloudtrail.Trail(this, 'CloudTrail', {
            snsTopic: topic,
            sendToCloudWatchLogs: true,
            cloudWatchLogsRetention: logs.RetentionDays.FOUR_MONTHS,
            trailName: 'Qwiz-Events'
        });

        const domain_role = new iam.Role(this, "SuperNovaRole", {
            roleName: "Nova-DO-NOT-DELETE",
            assumedBy: new iam.ServicePrincipal("nova.aws.internal"),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonRoute53FullAccess"),
                iam.ManagedPolicy.fromAwsManagedPolicyName("SecurityAudit")
            ]
        });

        // input your own domain name here. 
        const hosted_zone_name = '{your alias}.people.aws.dev'

        // looking up hosted zone already created to find the records
        const my_hosted_zone = route53.HostedZone.fromLookup(this, 'hosted_zone', {
            domainName: hosted_zone_name,
        });

        if (my_hosted_zone.hostedZoneNameServers){
            new route53.NsRecord(this, 'epa-nsrecord', {
                zone: my_hosted_zone,
                recordName: hosted_zone_name,
                values: [my_hosted_zone.hostedZoneNameServers]
             })
        }

        new route53.ARecord(this, 'epa-arecord', {
            zoneName: my_hosted_zone,

        })

        // appending the domian name to api url
        // const qwuiz_api_zone_name = 'api' + hosted_zone_name

 
        

        };
    }

