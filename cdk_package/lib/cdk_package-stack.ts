import { Stack, StackProps } from 'aws-cdk-lib';

import * as ddb from 'aws-cdk-lib/aws-dynamodb';
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
  }
}
