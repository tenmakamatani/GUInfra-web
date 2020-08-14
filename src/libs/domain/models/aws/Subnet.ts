import { Id } from "../base";
import { AWSResource } from "./common/AWSResource";
import { VPCId } from ".";

interface ISubnet {
  name: string;
  availabilityZone: string;
  cidrBlock: string;
  vpcId: VPCId;
}

export class Subnet extends AWSResource<ISubnet> {
  readonly id: SubnetId;

  constructor(init: { id?: string; properties: ISubnet }) {
    super(init.properties);
    this.id = new SubnetId(init.id);
  }
}

export class SubnetId extends Id {}
