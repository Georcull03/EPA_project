import { Construct } from 'constructs';
import { ServiceStage } from './pipeline-stage'
import { AlphaStage } from './pipeline-alpha-stage';
import { BetaStage } from "./pipeline-beta-stage";
import { ProdStage } from "./pipeline-prod-stage";
import * as cdk from 'aws-cdk-lib';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import { CodeBuildStep, CodePipeline, CodePipelineSource } from "aws-cdk-lib/pipelines";

export class QwizPipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const constants = {
            stages: [
                {name: "Prod", accountId: "929483735452", region: "us-west-1", isProd: false},
                {name: "Beta", accountId: "602709950483", region: "us-west-1", isProd: false},
                // {name: "Alpha", accountId: "911742436812", region: "us-west-1", isProd: false}.
            ]
        }

        // Use pre-exisitng CodeCommit repository
        const repo = codecommit.Repository.fromRepositoryName(this, 'QwizAppRepo', "QwizApp");

        const pipeline = new CodePipeline(this, 'QwizPipeline', {
            pipelineName: 'QwizAppPipeline_us_west_1',
            crossAccountKeys: true,
            synth: new CodeBuildStep('SynthStep', {
                input: CodePipelineSource.codeCommit(repo, 'main'),
                installCommands: [
                    'npm install -g aws-cdk',
                    'npm install -g typescript',
                ],
                commands: [
                    'cdk --version',
                    'tsc --version',
                    'pwd',
                    'ls',
                    'cd cdk_package',
                    'npm install',
                    'npm run build',
                    'cdk synth',
                    'ls -al',
                    'npm run test'
                ],
                primaryOutputDirectory: 'cdk_package/cdk.out'
            })
        });

        constants.stages.map((s) => {
            const deployment = new ServiceStage(this, (s.name.toLowerCase() + 'Deployment'), {
                env: { account: s.accountId, region: s.region },
                stageName: s.isProd ? '' : s.name.toLowerCase(),

            });

            const stage = pipeline.addStage(deployment)
        })
    }
}