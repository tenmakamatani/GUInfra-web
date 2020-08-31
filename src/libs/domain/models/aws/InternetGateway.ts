import { Id } from "../base";
import { AWSResource } from "./common/AWSResource";
import { VPCId } from "./VPC";

interface IInternetGateway {
  name: string;
  vpcId: VPCId;
}

export class InternetGateway extends AWSResource<IInternetGateway> {
  readonly id: InternetGatewayId;

  constructor(init: { id?: string; properties: IInternetGateway }) {
    super(init.properties);
    this.id = new InternetGatewayId(init.id);
  }
}

export class InternetGatewayId extends Id {}
