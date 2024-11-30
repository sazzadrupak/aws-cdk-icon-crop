import * as cdk from 'aws-cdk-lib';
import {
  CodePipeline,
  CodePipelineSource,
  ManualApprovalStep,
  ShellStep,
} from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { IconCropStack } from './icon-crop-stack';

export class IconCropPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'IconCropPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub(
          'sazzadrupak/aws-cdk-icon-crop.git',
          'master'
        ),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
        primaryOutputDirectory: 'cdk.out',
      }),
    });
    const devStage = pipeline.addStage(new IconCropAppStage(this, 'dev'));
    devStage.addPost(new ManualApprovalStep('approval'));
  }
}

class IconCropAppStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);
    new IconCropStack(this, 'IconCropStack', {});
  }
}
