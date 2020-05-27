import * as AWS from "aws-sdk";
import { injectable } from "inversify";

import { VPC } from "../../domain/models/aws";
import { IAWSState } from "../../domain/state/aws";
import { VPCRepository } from "../../domain/repositories/aws";

@injectable()
export class SdkVPCRepository extends VPCRepository {
  private _ec2: AWS.EC2;

  constructor(metadata: IAWSState["metadata"]) {
    super();
    this._ec2 = new AWS.EC2(metadata);
  }

  create = async (vpc: VPC): Promise<void> => {
    await this._ec2
      .createVpc({
        CidrBlock: vpc.properties.cidrBlock
      })
      .promise();
  };

  deleteAll = async (): Promise<void> => {};
}
