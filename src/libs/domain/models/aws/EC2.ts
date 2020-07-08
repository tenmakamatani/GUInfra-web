import { Id } from "../base";
import { AWSResource, ITag } from "./common/AWSResource";
import { VPCId } from "./VPC";

interface IEC2 {
  imageId: string;
  instanceType: string;
  // securityGroupIds, subnetId
}

export class EC2 extends AWSResource<IEC2> {
  readonly id: EC2Id;

  constructor(init: { id?: string; properties: IEC2; tags: ITag[] }) {
    super(init);
    this.id = new VPCId(init.id);
  }
}

export class EC2Id extends Id {}
