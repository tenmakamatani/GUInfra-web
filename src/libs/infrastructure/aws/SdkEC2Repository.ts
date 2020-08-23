import * as AWS from "aws-sdk";
import { injectable } from "inversify";

import { EC2, EC2Id } from "../../domain/models/aws";
import { IAWSState } from "../../domain/state/aws";
import { EC2Repository } from "../../domain/repositories/aws";
import { ResourceIdsDatastore } from "@libs/application/datastore/ResourceIdsDatastore";

@injectable()
export class SdkEC2Repository extends EC2Repository {
  private _ec2: AWS.EC2;

  constructor(metadata: IAWSState["metadata"]) {
    super();
    this._ec2 = new AWS.EC2(metadata);
  }

  async create(ec2: EC2): Promise<void> {
    const subnetId = ResourceIdsDatastore.getSubnetResourceId(
      ec2.properties.subnetId
    );
    const securityGroupIds = ec2.properties.securityGroupIds.map(s =>
      ResourceIdsDatastore.getSecurityGroupResourceId(s)
    );
    const createdEc2 = await this._ec2
      .runInstances({
        ImageId: "ami-0ee1410f0644c1cac",
        InstanceType: "t2.micro",
        MaxCount: 1,
        MinCount: 1,
        SubnetId: subnetId,
        SecurityGroupIds: securityGroupIds.length
          ? securityGroupIds
          : undefined,
        TagSpecifications: [
          {
            ResourceType: "instance",
            Tags: [
              {
                Key: "Name",
                Value: ec2.properties.name
              }
            ]
          }
        ]
      })
      .promise();
    const ec2Id = createdEc2.Instances![0].InstanceId!;
    ResourceIdsDatastore.setEc2Id({
      entityId: ec2.id,
      resourceId: ec2Id
    });
  }

  async delete(ec2EntityId: EC2Id): Promise<void> {
    const ec2ResourceId = ResourceIdsDatastore.getEc2ResourceId(ec2EntityId);
    await this._ec2
      .terminateInstances({
        InstanceIds: [ec2ResourceId]
      })
      .promise();
  }
}
