import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { createApiGateway } from './api-gateway';
import { createLambdaRole } from './iam';
import { createIconCropFunction } from './lambda';
import { createIconBuckets } from './s3';

export class IconCropStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const { iconSource, iconDest } = createIconBuckets(this);
    const lambdaRole = createLambdaRole(
      this,
      iconSource.bucketName,
      iconDest.bucketName
    );
    // const apiGatewayToLambda = createLambdaApiGateway(
    //   this,
    //   iconSource.bucketName,
    //   iconDest.bucketName
    // );
    const iconCrop = createIconCropFunction(
      this,
      lambdaRole,
      iconSource,
      iconDest
    );

    const api = createApiGateway(this, iconCrop);
  }
}
