import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origin from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';
import { Construct } from 'constructs';

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

    const bucket = new s3.Bucket(this, 'epa-bucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    const distribution = new cloudfront.Distribution(this, 'epa_cloudfront', {
      defaultBehavior: {
        origin: new origin.S3Origin(bucket),
      }
    });

    const api = new apigateway.RestApi(this, 'epa-api', {
      restApiName: 'epa-api'
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
  }
}
