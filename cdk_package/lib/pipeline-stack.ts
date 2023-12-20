import { Construct } from 'constructs';
import { AlphaStage } from './pipeline-alpha-stage';
import { BetaStage } from "./pipeline-beta-stage";
import * as cdk from 'aws-cdk-lib';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";

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
                    'npm install -g typescript',
                ],
                commands: [
                    'cdk --version',
                    'tsc --version',
                    'pwd',
                    'ls',
                    'npm install',
                    'npm run build',
                    'cdk synth',
                    'cd .. && cd test',
                    'npm run test'
                ],
                primaryOutputDirectory: 'cdk_package/cdk.out'
            })
        });

        const alpha_stage = pipeline.addStage(new AlphaStage(this, "Alpha", {
            env: { account: '177325120061', region: 'eu-west-2'}
        }));

        // alpha_stage.addPost(new ShellStep('Validate', {
        //     input: CodePipelineSource.codeCommit(repo, 'main'),
        //     commands: [
        //         'cd cdk_package/test',
        //         'npm run test'
        //     ]
        // }));

        const beta_stage = pipeline.addStage(new BetaStage(this, "Beta", {
            env: { account: '042538542222', region: 'eu-west-2'}
        }));
        //
        // beta_stage.addPost(new ShellStep('Validate', {
        //     input: CodePipelineSource.codeCommit(repo, 'main'),
        //     commands: [
        //         'cd cdk_package/test',
        //         'npm run test'
        //     ]
        // }));
    }
}