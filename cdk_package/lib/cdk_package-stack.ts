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
        })
        };

    }

