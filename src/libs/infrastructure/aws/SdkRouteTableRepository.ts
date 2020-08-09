import * as AWS from "aws-sdk";
import { injectable } from "inversify";

import { RouteTable } from "../../domain/models/aws";
import { IAWSState } from "../../domain/state/aws";
import { RouteTableRepository } from "../../domain/repositories/aws";

interface IRouteTableParams {
  GatewayId: string;
}

@injectable()
export class SdkRouteTableRepository extends RouteTableRepository {
  private _ec2: AWS.EC2;

  constructor(metadata: IAWSState["metadata"]) {
    super();
    this._ec2 = new AWS.EC2(metadata);
  }

  async create(
    routeTable: RouteTable,
    vpcId: string,
    gatewayId?: string
  ): Promise<string> {
    const routeTableParams = {} as IRouteTableParams;
    if (gatewayId) routeTableParams["GatewayId"] = gatewayId;
    const createdRouteTable = await this._ec2
      .createRouteTable({
        VpcId: vpcId
      })
      .promise();
    const routeTableId = createdRouteTable.RouteTable!.RouteTableId!;
    await this._ec2
      .createRoute({
        ...routeTableParams,
        RouteTableId: routeTableId
      })
      .promise();
    return routeTableId;
  }

  async deleteAll(ids: string[]): Promise<void> {
    const deleteRoutePromises = Promise.all(
      ids.map(id => this._ec2.deleteRoute({ RouteTableId: id }))
    );
    const deleteRouteTablePromises = Promise.all(
      ids.map(id => this._ec2.deleteRouteTable({ RouteTableId: id }))
    );
    await Promise.all([deleteRoutePromises, deleteRouteTablePromises]);
  }
}
