import * as AWS from "aws-sdk";
import { injectable } from "inversify";

import { EC2 } from "../../domain/models/aws";
import { IAWSState } from "../../domain/state/aws";
import { EC2Repository } from "../../domain/repositories/aws";

@injectable()
export class SdkEC2Repository extends EC2Repository {
  private _ec2: AWS.EC2;

  constructor(metadata: IAWSState["metadata"]) {
    super();
    this._ec2 = new AWS.EC2(metadata);
  }

  create = async (ec2: EC2): Promise<void> => {
    await this._ec2.runInstances({
      ImageId: ec2.properties.imageId,
      InstanceType: ec2.properties.instanceType,
      MaxCount: 1,
      MinCount: 1,
      TagSpecifications: [
        {
          ResourceType: "instance",
          Tags: ec2.tags.map(tag => ({
            Key: tag.key,
            Value: tag.value
          }))
        }
      ]
    });
  };

  deleteAll = async (): Promise<void> => {};
}
