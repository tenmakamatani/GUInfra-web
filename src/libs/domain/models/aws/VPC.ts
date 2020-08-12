import { Id } from "../base";
import { AWSResource } from "./common/AWSResource";

interface IVPC {
  cidrBlock: string;
}

export class VPC extends AWSResource<IVPC> {
  readonly id: VPCId;

  constructor(init: { id?: string; properties: IVPC }) {
    super(init.properties);
    this.id = new VPCId(init.id);
  }
}

export class VPCId extends Id {}
