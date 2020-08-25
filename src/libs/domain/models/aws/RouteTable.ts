import { Id } from "../base";
import { AWSResource } from "./common/AWSResource";
import { VPCId, SubnetId, InternetGatewayId } from ".";

interface IRouteTable {
  vpcId: VPCId;
  subnetId: SubnetId;
  gatewayId?: InternetGatewayId;
}

export class RouteTable extends AWSResource<IRouteTable> {
  readonly id: RouteTableId;

  constructor(init: { id?: string; properties: IRouteTable }) {
    super(init.properties);
    this.id = new RouteTableId(init.id);
  }
}

export class RouteTableId extends Id {}
