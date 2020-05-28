import { Id } from "../base";
import { AWSResource } from "./common/AWSResource";

interface IVPC {
  cidrBlock: string;
}

export class VPC extends AWSResource<IVPC> {
  readonly id: VPCId;
  public properties: IVPC;

  constructor(init: IVPC & { id?: string }) {
    super();
    this.id = new VPCId(init.id);
    this.properties = init;
  }
}

export class VPCId extends Id {}
