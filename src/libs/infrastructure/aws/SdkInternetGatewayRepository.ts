import * as AWS from "aws-sdk";
import { injectable } from "inversify";

import { InternetGateway, InternetGatewayId } from "../../domain/models/aws";
import { IAWSState } from "../../domain/state/aws";
import { InternetGatewayRepository } from "../../domain/repositories/aws";
import {
  ResourceIdsDatastore,
  ResourceIdsDependencyDatastore
} from "../../application/datastore";

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
    const vpcId = ResourceIdsDatastore.getVpcResourceId(
      internetGateway.properties.vpcId
    );
    const gatewayId = createdInternetGateway.InternetGateway!
      .InternetGatewayId!;
    // Nameのタグ作成,VPCへのアタッチ
    await Promise.all([
      this._ec2
        .createTags({
          Resources: [gatewayId],
          Tags: [
            {
              Key: "Name",
              Value: internetGateway.properties.name
            }
          ]
        })
        .promise(),
      this._ec2
        .attachInternetGateway({
          InternetGatewayId: gatewayId,
          VpcId: vpcId
        })
        .promise()
    ]);
    ResourceIdsDatastore.setInternetGatewayId({
      entityId: internetGateway.id,
      resourceId: createdInternetGateway.InternetGateway!.InternetGatewayId!
    });
    ResourceIdsDependencyDatastore.vpcAndInternetGateway.push({
      vpcId: vpcId,
      internetGatewayId: gatewayId
    });
  }

  async delete(internetGatewayEntityId: InternetGatewayId): Promise<void> {
    const internetGatewayResourceId = ResourceIdsDatastore.getInternetGatewayResourceId(
      internetGatewayEntityId
    );
    const vpcId = ResourceIdsDependencyDatastore.getVpcIdFromInternetGatewayId(
      internetGatewayResourceId
    );
    await this._ec2
      .detachInternetGateway({
        InternetGatewayId: internetGatewayResourceId,
        VpcId: vpcId
      })
      .promise();
    await this._ec2
      .deleteInternetGateway({
        InternetGatewayId: internetGatewayResourceId
      })
      .promise();
  }
}
