import * as AWS from "aws-sdk";
import { injectable } from "inversify";

import { InternetGateway, InternetGatewayId } from "../../domain/models/aws";
import { IAWSState } from "../../domain/state/aws";
import { InternetGatewayRepository } from "../../domain/repositories/aws";
import { ResourceIdsDatastore } from "../../application/datastore/ResourceIdsDatastore";

@injectable()
export class SdkInternetGatewayRepository extends InternetGatewayRepository {
  private _ec2: AWS.EC2;

  constructor(metadata: IAWSState["metadata"]) {
    super();
    this._ec2 = new AWS.EC2(metadata);
  }

  async create(internetGateway: InternetGateway): Promise<void> {
    const createdInternetGateway = await this._ec2
      .createInternetGateway()
      .promise();
    const gatewayId = createdInternetGateway.InternetGateway!
      .InternetGatewayId!;
    await this._ec2
      .attachInternetGateway({
        InternetGatewayId: gatewayId,
        VpcId: ResourceIdsDatastore.getVpcResourceId(
          internetGateway.properties.vpcId
        )
      })
      .promise();
    ResourceIdsDatastore.setInternetGatewayId({
      entityId: internetGateway.id,
      resourceId: createdInternetGateway.InternetGateway!.InternetGatewayId!
    });
  }

  async delete(internetGatewayEntityId: InternetGatewayId): Promise<void> {
    const internetGatewayResourceId = ResourceIdsDatastore.getInternetGatewayResourceId(
      internetGatewayEntityId
    );
    await this._ec2
      .deleteInternetGateway({
        InternetGatewayId: internetGatewayResourceId
      })
      .promise();
  }
}
