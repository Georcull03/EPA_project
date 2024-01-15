import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { CdkPackageStack } from "./cdk_package-stack";
import { MonitoringStack } from "./Monitoring-stack";

export interface ServiceStageProps extends cdk.StageProps {
    readonly stageName: string;
}

export class ServiceStage extends cdk.Stage {
    constructor(scope: Construct, id: string, props?: ServiceStageProps) {
        super(scope, id, props);

        const stageNameProp = props?.stageName;

        const cdkStack = new CdkPackageStack(this, 'cdkStack', {
            stageName: stageNameProp || ''
        });

        const monitoringStack = new MonitoringStack(this, 'monitoringStack', {
            stageName: stageNameProp || '',
            dashboardName: 'QwizMonitorDashboard'
        });
        const displayName = props?.stageName ? props.stageName : ""

        monitoringStack.addLambda(displayName + "GetFunction", displayName + "GetFunction");
        monitoringStack.addLambda(displayName + "PutFunction", displayName + "PutFunction");
        monitoringStack.addApi("epa-api", displayName + "epa-api");
        monitoringStack.addDynamoDB("qwizgurus_interview_table", displayName + "qwizgurus_interview_table");
    }
}