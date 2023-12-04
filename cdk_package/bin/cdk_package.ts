#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkPackageStack } from '../lib/cdk_package-stack';

const app = new cdk.App();
new CdkPackageStack(app, 'CdkPackageStack');
