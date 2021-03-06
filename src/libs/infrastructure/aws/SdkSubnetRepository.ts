import * as AWS from "aws-sdk";
import { injectable } from "inversify";

import { Subnet, SubnetId } from "../../domain/models/aws";
import { IAWSState } from "../../domain/state/aws";
import { SubnetRepository } from "../../domain/repositories/aws";
import { ResourceIdsDatastore } from "../../application/datastore";

@injectable()
export class SdkSubnetRepository extends SubnetRepository {
  private _ec2: AWS.EC2;

  constructor(metadata: IAWSState["metadata"]) {
    super();
    this._ec2 = new AWS.EC2(metadata);
  }

  async create(subnet: Subnet): Promise<void> {
    const vpcId = ResourceIdsDatastore.getVpcResourceId(
      subnet.properties.vpcId
    );
    const createdSubnet = await this._ec2
      .createSubnet({
        AvailabilityZone: subnet.properties.availabilityZone,
        CidrBlock: subnet.properties.cidrBlock,
        VpcId: vpcId
      })
      .promise();
    const subnetId = createdSubnet.Subnet!.SubnetId!;
    await this._ec2
      .createTags({
        Resources: [subnetId],
        Tags: [
          {
            Key: "Name",
            Value: subnet.properties.name
          }
        ]
      })
      .promise();
    ResourceIdsDatastore.setSubnetId({
      entityId: subnet.id,
      resourceId: subnetId
    });
  }

  async delete(subnetEntityId: SubnetId): Promise<void> {
    const subnetResourceId = ResourceIdsDatastore.getSubnetResourceId(
      subnetEntityId
    );
    await this._ec2.deleteSubnet({ SubnetId: subnetResourceId }).promise();
  }
}
