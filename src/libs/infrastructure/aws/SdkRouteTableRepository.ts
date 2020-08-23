import * as AWS from "aws-sdk";
import { injectable } from "inversify";

import { RouteTable, RouteTableId } from "../../domain/models/aws";
import { IAWSState } from "../../domain/state/aws";
import { RouteTableRepository } from "../../domain/repositories/aws";
import { ResourceIdsDatastore } from "../../application/datastore/ResourceIdsDatastore";

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

  async create(routeTable: RouteTable): Promise<void> {
    const vpcId = ResourceIdsDatastore.getVpcResourceId(
      routeTable.properties.vpcId
    );
    const routeTableParams = {} as IRouteTableParams;
    if (routeTable.properties.gatewayId) {
      routeTableParams[
        "GatewayId"
      ] = ResourceIdsDatastore.getInternetGatewayResourceId(
        routeTable.properties.gatewayId
      );
    }
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
    ResourceIdsDatastore.setRouteTableId({
      entityId: routeTable.id,
      resourceId: routeTableId
    });
  }

  async delete(routeTableEntityId: RouteTableId): Promise<void> {
    const routeTableResourceId = ResourceIdsDatastore.getRouteTableResourceId(
      routeTableEntityId
    );
    await Promise.all([
      this._ec2.deleteRoute({ RouteTableId: routeTableResourceId }),
      this._ec2.deleteRouteTable({ RouteTableId: routeTableResourceId })
    ]);
  }
}
