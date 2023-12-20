import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { CdkPackageStack } from './cdk_package-stack';

export class ProdStage extends cdk.Stage {

    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
        super(scope, id, props);

        const cdkStack = new CdkPackageStack(this, 'cdkStack');
    }
}