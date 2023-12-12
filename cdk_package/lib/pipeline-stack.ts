import {Construct} from 'constructs';
import {AlphaStage} from './pipeline-alpha-stage';
import * as cdk from 'aws-cdk-lib';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import {CodeBuildStep, CodePipeline, CodePipelineSource} from "aws-cdk-lib/pipelines";

export class QwizPipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        // Use pre-exisitng CodeCommit repository
        const repo = codecommit.Repository.fromRepositoryName(this, 'QwizRepo', "Qwiz_guru_interview_site");

        const pipeline = new CodePipeline(this, 'QwizPipeline', {
            pipelineName: 'QwizPipeline',
            crossAccountKeys: true,
            synth: new CodeBuildStep('SynthStep', {
                input: CodePipelineSource.codeCommit(repo, 'main'),
                installCommands: [
                    'npm install -g aws-cdk',
                    'npm install -g aws-cdk-lib',
                    'npm install -g typescript',
                    'npm i ts-node@latest'
                ],
                commands: [
                    'cdk --version',
                    'pwd',
                    'cd cdk_package',
                    'ls',
                    'cdk synth'
                ],
                primaryOutputDirectory: 'cdk_package/',
            })
        });

        pipeline.addStage(new AlphaStage(this, "Alpha", {
            env: { account: '177325120061', region: 'eu-west-2'}
        }))
    }
}