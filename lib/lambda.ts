import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export function createIconCropFunction(
  scope: Construct,
  role: iam.Role,
  iconSource: s3.Bucket,
  iconDest: s3.Bucket
): lambda.Function {
  const iconCrop = new lambda.Function(scope, 'IconCrop', {
    runtime: lambda.Runtime.NODEJS_20_X,
    handler: 'index.handler',
    code: lambda.Code.fromAsset('lambda/function.zip'),
    architecture: lambda.Architecture.ARM_64,
    role,
    environment: {
      SOURCE_BUCKET: iconSource.bucketName,
      DESTINATION_BUCKET: iconDest.bucketName,
    },
  });
  return iconCrop;
}
