#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkPackageStack } from '../lib/cdk_package-stack';
import {QwizPipelineStack} from "../lib/pipeline-stack";

const app = new cdk.App();
new QwizPipelineStack(app, 'QwizPipelineStack', {
    env : {
        account: '548401817486',
        region:'eu-west-2',
    }
});
