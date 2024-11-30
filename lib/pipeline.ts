import * as cdk from 'aws-cdk-lib';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import * as pipelines from 'aws-cdk-lib/pipelines';

import { Construct } from 'constructs';
import { IconCropStack } from './icon-crop-stack';

export class IconCropPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const pipeline = new CodePipeline(this, 'Pipeline', {
    //   pipelineName: 'IconCropPipeline',
    //   synth: new ShellStep('Synth', {
    //     input: CodePipelineSource.gitHub(
    //       'sazzadrupak/aws-cdk-icon-crop.git',
    //       'master',
    //       {
    //         authentication: cdk.SecretValue.secretsManager('github-token'),
    //       }
    //     ),
    //     commands: ['npm ci', 'npm run build', 'npx cdk synth'],
    //     primaryOutputDirectory: 'cdk.out',
    //   }),
    // });
    // const devStage = pipeline.addStage(new IconCropAppStage(this, 'dev'));
    // devStage.addPost(new ManualApprovalStep('approval'));

    const repo = new codecommit.Repository(this, 'IconCropRepo', {
      repositoryName: 'IconCropRepo',
    });

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      pipelineName: 'IconCropPipeline',
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.codeCommit(repo, 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
        primaryOutputDirectory: 'cdk.out',
      }),
    });

    pipeline.addStage(new IconCropAppStage(this, 'Dev'));

    // Output the CodeCommit repository URL
    new cdk.CfnOutput(this, 'RepoUrl', {
      value: repo.repositoryCloneUrlHttp,
      description: 'The URL of the newly created CodeCommit repository',
      exportName: 'IconCropRepoUrl',
    });
  }
}

class IconCropAppStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);
    new IconCropStack(this, 'IconCropStack', {});
  }
}
