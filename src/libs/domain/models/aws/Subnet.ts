import { Id } from "../base";
import { AWSResource, ITag } from "./common/AWSResource";
import { VPCId } from ".";

interface ISubnet {
  availabilityZone: string;
  cidrBlock: string;
  vpcId: VPCId;
}

export class Subnet extends AWSResource<ISubnet> {
  readonly id: SubnetId;

  constructor(init: { id: string; properties: ISubnet; tags: ITag[] }) {
    super(init);
    this.id = new SubnetId(init.id);
  }
}

export class SubnetId extends Id {}
