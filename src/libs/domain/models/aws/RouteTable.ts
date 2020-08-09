import { Id } from "../base";
import { AWSResource, ITag } from "./common/AWSResource";
import { VPCId, InternetGatewayId } from ".";

interface IRouteTable {
  vpcId?: VPCId;
  gatewayId?: InternetGatewayId;
}

export class RouteTable extends AWSResource<IRouteTable> {
  readonly id: RouteTableId;

  constructor(init: { id?: string; properties: IRouteTable; tags: ITag[] }) {
    super(init);
    this.id = new RouteTableId(init.id);
  }
}

export class RouteTableId extends Id {}
