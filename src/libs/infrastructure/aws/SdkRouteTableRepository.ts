import * as AWS from "aws-sdk";
import { injectable } from "inversify";

import { RouteTable, RouteTableId } from "../../domain/models/aws";
import { IAWSState } from "../../domain/state/aws";
import { RouteTableRepository } from "../../domain/repositories/aws";
import {
  ResourceIdsDatastore,
  ResourceIdsDependencyDatastore
} from "../../application/datastore";

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
    const subnetId = ResourceIdsDatastore.getSubnetResourceId(
      routeTable.properties.subnetId
    );
    const createdRouteTable = await this._ec2
      .createRouteTable({
        VpcId: vpcId
      })
      .promise();
    const routeTableId = createdRouteTable.RouteTable!.RouteTableId!;
    if (routeTable.properties.gatewayId) {
      await this._ec2
        .createRoute({
          DestinationCidrBlock: "0.0.0.0/0",
          GatewayId: ResourceIdsDatastore.getInternetGatewayResourceId(
            routeTable.properties.gatewayId
          ),
          RouteTableId: routeTableId
        })
        .promise();
    }
    const association = await this._ec2
      .associateRouteTable({
        RouteTableId: routeTableId,
        SubnetId: subnetId
      })
      .promise();
    ResourceIdsDatastore.setRouteTableId({
      entityId: routeTable.id,
      resourceId: routeTableId
    });
    ResourceIdsDependencyDatastore.associationAndRouteTable.push({
      associationId: association.AssociationId!,
      routeTableId: routeTableId
    });
  }

  async delete(routeTableEntityId: RouteTableId): Promise<void> {
    const routeTableResourceId = ResourceIdsDatastore.getRouteTableResourceId(
      routeTableEntityId
    );
    const associationId = ResourceIdsDependencyDatastore.getAssociationIdFromRouteTableId(
      routeTableResourceId
    );
    await this._ec2
      .disassociateRouteTable({
        AssociationId: associationId
      })
      .promise();
    await this._ec2
      .deleteRoute({
        RouteTableId: routeTableResourceId,
        DestinationCidrBlock: "0.0.0.0/0"
      })
      .promise();
    await this._ec2
      .deleteRouteTable({ RouteTableId: routeTableResourceId })
      .promise();
  }
}
