import * as AWS from "aws-sdk";
import { injectable } from "inversify";

import { VPC } from "../../domain/models/aws";
import { IAWSState } from "../../domain/state/aws";
import { VPCRepository } from "../../domain/repositories/aws";
import { ResourceIdsDatastore } from "../../application/datastore/ResourceIdsDatastore";

@injectable()
export class SdkVPCRepository extends VPCRepository {
  private _ec2: AWS.EC2;

  constructor(metadata: IAWSState["metadata"]) {
    super();
    this._ec2 = new AWS.EC2(metadata);
  }

  async create(vpc: VPC): Promise<string> {
    const createdVpc = await this._ec2
      .createVpc({
        CidrBlock: vpc.properties.cidrBlock
      })
      .promise();
    const vpcId = createdVpc.Vpc!.VpcId!;
    await this._ec2
      .createTags({
        Resources: [vpcId],
        Tags: [
          {
            Key: "Name",
            Value: vpc.properties.name
          }
        ]
      })
      .promise();
    ResourceIdsDatastore.setVpcId({
      entityId: vpc.id,
      resourceId: vpcId
    });
    return vpcId;
  }

  async deleteAll(ids: string[]): Promise<void> {
    const deleteVpcPromises = ids.map(vpcId =>
      this._ec2.deleteVpc({ VpcId: vpcId }).promise()
    );
    await Promise.all(deleteVpcPromises);
  }
}
