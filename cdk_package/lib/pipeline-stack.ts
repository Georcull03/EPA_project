import { Construct } from 'constructs';
import { ServiceStage } from './pipeline-stage'
import * as cdk from 'aws-cdk-lib';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import {CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";

export class QwizPipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const constants = {
            stages: [
                {name: "Alpha", accountId: "911742436812", region: "us-west-1", isProd: false},
                {name: "Beta", accountId: "602709950483", region: "us-west-1", isProd: false},
                {name: "Prod", accountId: "929483735452", region: "us-west-1", isProd: true}
            ]
        }

        const repo = codecommit.Repository.fromRepositoryName(this, 'QwizAppRepo', "QwizApp");
        const source = CodePipelineSource.codeCommit(repo, 'main');

        const pipeline = new CodePipeline(this, 'QwizPipeline', {
            pipelineName: 'QwizAppPipeline_us_west_1',
            crossAccountKeys: true,
            synth: new CodeBuildStep('SynthStep', {
                input: source,
                installCommands: [
                    'npm install -g aws-cdk',
                    'npm install -g typescript',
                ],
                commands: [
                    'cdk --version',
                    // 'tsc --version',
                    // 'pwd',
                    // 'ls',
                    // 'cd cdk_package',
                    // 'npm install',
                    // 'npm run build',
                    // 'cdk synth',
                    // 'ls -al',
                    // 'npm run test',
                    // 'cd ../cloudscape',
                    // 'npm install',
                    // 'npm run build'
                ],
                primaryOutputDirectory: 'cdk_package/cdk.out'
            })
        });

        constants.stages.map((s) => {
            const deployment = new ServiceStage(this, (s.name.toLowerCase() + 'Deployment'), {
                env: { account: s.accountId, region: s.region },
                stageName: s.isProd ? 'prod' : s.name.toLowerCase(),

            });

            const stage = pipeline.addStage(deployment)
            stage.addPre(new ShellStep("Testing", {
                input: source,
                commands: ['cd cdk_package', 'npm install', 'npm run build', 'npm run test']
            }));

            let curlFrontend: string
            let curlApi: string

            if (stage.stageName != 'prod') {
                curlFrontend = `curl -Ssf https://${stage.stageName}qwiz.cullenge.people.aws.dev/`
                curlApi = `curl -Ssf https://${stage.stageName}api.cullenge.people.aws.dev/question | jq`
            } else {
                curlFrontend = 'curl -Ssf https://qwiz.cullenge.people.aws.dev/'
                curlApi = 'curl -Ssf https://api.cullenge.people.aws.dev/question | jq'
            }

            stage.addPost(new ShellStep("TestEndpoint", {
                commands: [curlFrontend, curlApi]
            }))
        })
    }
}