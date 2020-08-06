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

  create = async (vpc: VPC): Promise<string> => {
    const createdVpc = await this._ec2
      .createVpc({
        CidrBlock: vpc.properties.cidrBlock
      })
      .promise();
    const vpcId = createdVpc.Vpc!.VpcId!;
    ResourceIdsDatastore.vpcIds.push(vpcId);
    return vpcId;
  };

  deleteAll = async (): Promise<void> => {
    const deleteVpcPromises = ResourceIdsDatastore.vpcIds.map(vpcId =>
      this._ec2.deleteVpc({ VpcId: vpcId }).promise()
    );
    await Promise.all(deleteVpcPromises);
  };
}
