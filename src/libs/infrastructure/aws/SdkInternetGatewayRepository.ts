import * as AWS from "aws-sdk";
import { injectable } from "inversify";

import { InternetGateway } from "../../domain/models/aws";
import { IAWSState } from "../../domain/state/aws";
import { InternetGatewayRepository } from "../../domain/repositories/aws";

@injectable()
export class SdkInternetGatewayRepository extends InternetGatewayRepository {
  private _ec2: AWS.EC2;

  constructor(metadata: IAWSState["metadata"]) {
    super();
    this._ec2 = new AWS.EC2(metadata);
  }

  async create(internetGateway: InternetGateway): Promise<string> {
    const createdInternetGateway = await this._ec2
      .createInternetGateway()
      .promise();
    return createdInternetGateway.InternetGateway!.InternetGatewayId!;
  }

  async deleteAll(ids: string[]): Promise<void> {
    const deleteInternetGatewayPromises = ids.map(id =>
      this._ec2.deleteInternetGateway({
        InternetGatewayId: id
      })
    );
    await Promise.all(deleteInternetGatewayPromises);
  }
}
