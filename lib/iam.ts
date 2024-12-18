import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export function createLambdaRole(
  scope: Construct,
  iconSourceName: string,
  iconDestName: string
): iam.Role {
  const lambdaRole = new iam.Role(scope, 'LambdaExecutionRole', {
    assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    managedPolicies: [
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        'service-role/AWSLambdaBasicExecutionRole'
      ),
    ],
  });

  lambdaRole.addToPolicy(
    new iam.PolicyStatement({
      actions: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject'],
      resources: [
        `arn:aws:s3:::${iconSourceName}/*`,
        `arn:aws:s3:::${iconDestName}/*`,
      ],
    })
  );
  return lambdaRole;
}
