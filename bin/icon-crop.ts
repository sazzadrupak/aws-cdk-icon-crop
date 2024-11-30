#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { IconCropStack } from '../lib/icon-crop-stack';
import { IconCropPipelineStack } from '../lib/pipeline';

const app = new cdk.App();
const stack = new IconCropStack(app, 'IconCropStack', {});
const pipeline = new IconCropPipelineStack(app, 'IconCropPipelineStack', {
  env: {
    account: '905418160545',
    region: 'us-east-1',
  },
});

// Tags on whole stack
cdk.Tags.of(stack).add('environment', 'dev');
cdk.Tags.of(stack).add('application', 'icon-crop');
