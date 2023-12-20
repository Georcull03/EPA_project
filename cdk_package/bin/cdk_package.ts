#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {QwizPipelineStack} from "../lib/pipeline-stack";

const app = new cdk.App();
new QwizPipelineStack(app, 'QwizPipelineStack', {
    env : {
        account: '753100010666',
        region:'us-west-1',
    }
});
app.synth();
