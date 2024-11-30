#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { IconCropStack } from '../lib/icon-crop-stack';

const app = new cdk.App();
const stack = new IconCropStack(app, 'IconCropStack', {});

// Tags on whole stack
cdk.Tags.of(stack).add('environment', 'dev');
cdk.Tags.of(stack).add('application', 'icon-crop');
