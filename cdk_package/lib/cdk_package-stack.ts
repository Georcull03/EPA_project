import { Stack, StackProps } from 'aws-cdk-lib';
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
import * as kms from 'aws-cdk-lib/aws-kms';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as path from 'path';
import { Construct } from 'constructs';

export class CdkPackageStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        //  dynamo table
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

        // lambda fetch interview question data
        const getFunction = new lambda.Function(this, 'Function', {
            runtime: lambda.Runtime.PYTHON_3_9,
            handler: 'get_index.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, 'lambdaHandler')),
        });

        // const version = getFunction.currentVersion;
        // const alias = new lambda.Alias(this, 'GetFunctionLambdaAlias', {
        //     aliasName: 'Prod',
        //     version,
        // });

        if (getFunction.role === null) {
            throw new Error('Lambda function role cannot be null');
        }

        getFunction.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'))

        getFunction.addEnvironment("TABLE_NAME", table.tableName)

        table.grantReadWriteData(getFunction)

        // lambda write interview question data
        const putFunction = new lambda.Function(this, 'putFunction', {
            runtime: lambda.Runtime.PYTHON_3_9,
            handler: 'index.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, 'put-lambda-handler')),
        });

        // const put_version = getFunction.currentVersion;
        // const put_alias = new lambda.Alias(this, 'PutFunctionLambdaAlias', {
        //     aliasName: 'Prod',
        //     version,
        // });

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
            }
        });

        const api = new apigateway.RestApi(this, 'epa-api', {
            restApiName: 'epa-api'
        });

        const putlambdaintegration = new apigateway.LambdaIntegration(putFunction);
        const getlambdaintegration = new apigateway.LambdaIntegration(getFunction);

        /*
        commented out sections re cognito

        this links pre-exisitng cognito user pool to a Cognito API Authorizer

        for each api resource method, need to declare this as so:

        {
        //     authorizer: <api auth const name>,
        //     authprizaionType: apigateway.AuthorizationType.COGNITO,
        // }

        */

        // // cognito authZ for user pool already created

        // const qwizUserPool = cognito.UserPool.fromUserPoolId(this, 'user_pool_id', 'eu-west-2_Gzt3IyXug')

        // const apiAuth = new apigateway.CognitoUserPoolsAuthorizer(this, 'apiAuthoriser', {
        //     cognitoUserPools: [qwizUserPool]
        // })

        const putresource = api.root.addResource("put");
        putresource.addMethod("PUT", putlambdaintegration);

        const getresource = api.root.addResource("get");
        // getresource.addMethod("GET", getlambdaintegration), {
        //     authorizer: apiAuth,
        //     authprizaionType: apigateway.AuthorizationType.COGNITO,
        // }

        // cloud trail
        const key = new kms.Key(this, 'cloudTrailKey', {
            enableKeyRotation: true,
        });
        key.grantEncrypt(new iam.ServicePrincipal('cloudtrail.amazonaws.com'));


        const topic = new sns.Topic(this, 'APIEvents')
        const trail = new cloudtrail.Trail(this, 'CloudTrail', {
            snsTopic: topic,
            sendToCloudWatchLogs: true,
            cloudWatchLogsRetention: logs.RetentionDays.FOUR_MONTHS,
            trailName: 'Qwiz-Events',
            encryptionKey: key
        });
    };
    // private Authorizer(stack: Stack) {
    //     new apigateway.CognitoUserPoolsAuthorizer(this, 'apiAuthoriser', {
    //         cognitoUserPools: [qwizUserPool] // Userpool not yet defined.
    //     })
    // }
}



