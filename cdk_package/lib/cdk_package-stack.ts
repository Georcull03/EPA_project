import { Stack, StackProps, Duration } from 'aws-cdk-lib';
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
import * as path from 'path';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as target from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

export interface ServiceStackProps extends StackProps {
    readonly stageName: string;
}

export class CdkPackageStack extends Stack {
    constructor(scope: Construct, id: string, props?: ServiceStackProps) {
        let allowedOrigins;
        super(scope, id, props);

        const table = new ddb.Table(this, '{tableName}' + props?.stageName, {
            tableName: '{tableName}',
            partitionKey: {
                name: '{level}',
                type: ddb.AttributeType.STRING,
            },
            sortKey: {
                name: '{question}',
                type: ddb.AttributeType.STRING
            }
        });

        const getFunction = new lambda.Function(this, 'Function', {
            functionName: props?.stageName + 'GetFunction',
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'get_index.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, 'lambdaHandler')),
        });

        if (getFunction.role === null) {
            throw new Error('Lambda function role cannot be null');
        }

        getFunction.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'))

        getFunction.addEnvironment("TABLE_NAME", table.tableName)

        if (props?.stageName != undefined) {
            getFunction.addEnvironment("DNS_STAGE", props?.stageName)
        }

        table.grantReadWriteData(getFunction)

        const putFunction = new lambda.Function(this, 'putFunction', {
            functionName: props?.stageName + 'PutFunction',
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'put_index.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, 'lambdaHandler')),
        });

        if (putFunction.role === null) {
            throw new Error('Lambda function role cannot be null');
        }

        putFunction.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'))

        putFunction.addEnvironment("TABLE_NAME", table.tableName)

        if (props?.stageName != undefined) {
            putFunction.addEnvironment("DNS_STAGE", props?.stageName)
        }

        table.grantReadWriteData(putFunction)

        const bucket = new s3.Bucket(this, '{bucketName}', {
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        });

        if (props?.stageName != 'prod') {
            allowedOrigins = [
                "https://" + props?.stageName + "{domainName}",
                "https://" + props?.stageName + "{apiDomain}"
            ];
        } else {
            allowedOrigins = ["{domainName}", "{apiDomain}"];
        }

        bucket.addCorsRule({
            allowedOrigins: allowedOrigins,
            allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT],
            allowedHeaders: ["*"],
            exposedHeaders: ["Access-Control-Allow-Origin"]
        })

        const oai = new cloudfront.OriginAccessIdentity(this, 'epa-oai');

        bucket.grantRead(oai);

        const api = new apigateway.RestApi(this, 'epa-api', {
            restApiName: 'epa-api',
            defaultCorsPreflightOptions: {
                allowOrigins: allowedOrigins,
                allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
                allowMethods: ["GET", "PUT"]
            }
        });

        const deployment = new s3deploy.BucketDeployment(this, 'DeployWebsite', {
            sources: [s3deploy.Source.asset(path.join(__dirname, '../../cloudscape'))],
            destinationBucket: bucket,
        });

        const putlambdaintegration = new apigateway.LambdaIntegration(putFunction);
        const getlambdaintegration = new apigateway.LambdaIntegration(getFunction);

        const hosted_zone_name = '{hostedZoneName}';
        const hostedZoneID = '{hostedZoneID}';
        const novaCrossDNSRole = '{novaCrossDNSRole}';

        let qwiz_api_zone_name: string;

        // constructing the api url with the domain name
        if (props?.stageName != 'prod') {
            qwiz_api_zone_name = props?.stageName + 'api.' + hosted_zone_name
        } else {
            qwiz_api_zone_name = 'api.' + hosted_zone_name
        }

        // looking up hosted zone already created to find the records
        const my_hosted_zone = route53.HostedZone.fromHostedZoneAttributes(this, 'hosted_zone',
            {
            hostedZoneId: hostedZoneID,
            zoneName: hosted_zone_name,
        });

        // creating a zone for the sub domain for the api
        const api_hosted_sub_zone = new route53.PublicHostedZone(this, 'api_sub', {
           zoneName: qwiz_api_zone_name,
        });

        const domain_delegation_api = new route53.CrossAccountZoneDelegationRecord(this, 'zoneDelegationAPI', {
            delegatedZone: api_hosted_sub_zone,
            parentHostedZoneId: hostedZoneID,
            delegationRole: iam.Role.fromRoleArn(this, "DelegationRoleAPI", novaCrossDNSRole)
        });

        // SSL certificate.
        const ssl_cert_api = new acm.DnsValidatedCertificate(this, 'certificate_api', {
           domainName: qwiz_api_zone_name,
           hostedZone: api_hosted_sub_zone,
        });

        // adding the domain name to the api gateway
        api.addDomainName('api_domain', {
           domainName: qwiz_api_zone_name,
           certificate: ssl_cert_api,
        });

        // creating text records for security
        // values provided state that no email addresses/IPs are allowed to send emails from this domain
        new route53.TxtRecord(this, 'api_domain_txt_record_spf', {
           zone: api_hosted_sub_zone,
           recordName: qwiz_api_zone_name,
           values: ['####'],
           comment: '######'
        });

        // creating text records for security
        // values provided aids the spf records to mitigate spoofing
        new route53.TxtRecord(this, 'api_domain_txt_record', {
           zone: api_hosted_sub_zone,
           recordName: '_dmarc.' + qwiz_api_zone_name,
           values: ['#######'],
           comment: '#######'
        });

        new route53.ARecord(this, 'ApiARecord', {
            zone: api_hosted_sub_zone,
            target: route53.RecordTarget.fromAlias(new target.ApiGateway(api)),
            ttl: Duration.minutes(5)
        });

        new route53.AaaaRecord(this, 'ApiAAAARecord', {
            zone: api_hosted_sub_zone,
            target: route53.RecordTarget.fromAlias(new target.ApiGateway(api)),
            ttl: Duration.minutes(5)
        });

        let qwiz_distribution_zone_name: string;

        // constructing the distribution url using the parent domain name
        if (props?.stageName != 'prod') {
            qwiz_distribution_zone_name = props?.stageName + 'qwiz.' + hosted_zone_name
        } else {
            qwiz_distribution_zone_name = 'qwiz.' + hosted_zone_name
        }

        // create a zone for the sub domain for the distribution
        const distribution_hosted_sub_zone = new route53.PublicHostedZone(this, 'distribution_sub', {
          zoneName: qwiz_distribution_zone_name
        });

        const domain_delegation_cdn = new route53.CrossAccountZoneDelegationRecord(this, 'zoneDelegationCDN', {
            delegatedZone: distribution_hosted_sub_zone,
            parentHostedZoneId: hostedZoneID,
            delegationRole: iam.Role.fromRoleArn(this, "DelegationRoleCDN", novaCrossDNSRole)
        });

        // SSL certificate for distribution domain
        const ssl_cert_distribution = new acm.DnsValidatedCertificate(this, 'certificate_distribution', {
           domainName: qwiz_distribution_zone_name,
           hostedZone: distribution_hosted_sub_zone,
           region: 'us-east-1',
        });

        const distribution = new cloudfront.Distribution(this, 'epa_cloudfront', {
            defaultBehavior: {
                origin: new origin.S3Origin(deployment.deployedBucket, {
                    originAccessIdentity: oai,
                    originPath: '/lib'
                }),
                       originRequestPolicy: cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN,
                       viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                       allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
                       responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.CORS_ALLOW_ALL_ORIGINS,
                       cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
            },
               domainNames: [qwiz_distribution_zone_name],
               certificate: ssl_cert_distribution,
               enableIpv6: true,
               defaultRootObject: 'home/index.html'
        });

        // creating text records for security
        // values provided state that no email addresses/IPs are allowed to send emails from this domain
        new route53.TxtRecord(this, 'distribution_domain_txt_record_spf', {
           zone: distribution_hosted_sub_zone,
           recordName: qwiz_distribution_zone_name,
           values: ['######'],
           comment: '######'
        });

        // creating text records for security
        // values provided aids the spf records to mitigate spoofing
        new route53.TxtRecord(this, 'distribution_domain_txt_record', {
           zone: distribution_hosted_sub_zone,
           recordName: '_dmarc.' + qwiz_distribution_zone_name,
           values: ['######'],
           comment: '#####'
        });

        // Cloudfront: records

        new route53.ARecord(this, 'DistributionARecord', {
            zone: distribution_hosted_sub_zone,
            target: route53.RecordTarget.fromAlias(new target.CloudFrontTarget(distribution)),
            ttl: Duration.minutes(5)
        });

        new route53.AaaaRecord(this, 'DistributionAAAARecord', {
            zone: distribution_hosted_sub_zone,
            target: route53.RecordTarget.fromAlias(new target.CloudFrontTarget(distribution)),
            ttl: Duration.minutes(5)
        });

        const putresource = api.root.addResource("put-question");
        putresource.addMethod("PUT", putlambdaintegration);

        const getresource = api.root.addResource("question");
        getresource.addMethod("GET", getlambdaintegration);

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
}

