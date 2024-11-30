import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export function createApiGateway(
  scope: Construct,
  handler: lambda.Function
): apigateway.RestApi {
  const api = new apigateway.RestApi(scope, 'IconCropAPI', {
    restApiName: 'Icon crop service',
    description: 'Resizes and croped icons to 200 x 200 pixels',
    deployOptions: {
      stageName: 'dev',
    },
  });

  const cropImage = api.root.addResource('crop-image');
  const integration = new apigateway.LambdaIntegration(handler);

  cropImage.addMethod('GET', integration, {
    authorizationType: apigateway.AuthorizationType.NONE,
  });

  /* const deployment = new apigateway.Deployment(scope, 'Deployment', {
    api: api,
  });

  new apigateway.Stage(scope, 'Staging', {
    deployment: deployment,
    stageName: 'dev',
  }); */

  return api;
}
