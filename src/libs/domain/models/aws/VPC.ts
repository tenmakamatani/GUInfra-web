import { Id } from "../base";
import { AWSResource } from "./common/AWSResource";

interface IVPC {
  cidrBlock: string;
}

export class VPC extends AWSResource<IVPC> {
  readonly id: VPCId;
  public properties: IVPC;

  constructor(init: { id?: string; properties: IVPC }) {
    super();
    this.id = new VPCId(init.id);
    this.properties = init.properties;
  }
}

export class VPCId extends Id {}
