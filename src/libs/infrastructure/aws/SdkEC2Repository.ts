import * as AWS from "aws-sdk";
import { injectable } from "inversify";

import { EC2 } from "../../domain/models/aws";
import { IAWSState } from "../../domain/state/aws";
import { EC2Repository } from "../../domain/repositories/aws";
import { ResourceIdsDatastore } from "../../application/datastore/ResourceIdsDatastore";

@injectable()
export class SdkEC2Repository extends EC2Repository {
  private _ec2: AWS.EC2;

  constructor(metadata: IAWSState["metadata"]) {
    super();
    this._ec2 = new AWS.EC2(metadata);
  }

  create = async (ec2: EC2): Promise<string> => {
    const createdEc2 = await this._ec2
      .runInstances({
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
      })
      .promise();
    const ec2Id = createdEc2.Instances![0].InstanceId!;
    return ec2Id;
  };

  deleteAll = async (): Promise<void> => {
    await this._ec2
      .terminateInstances({
        InstanceIds: ResourceIdsDatastore.ec2Ids
      })
      .promise();
  };
}
