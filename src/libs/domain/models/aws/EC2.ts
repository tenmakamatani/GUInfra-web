import { Id } from "../base";
import { AWSResource } from "./common/AWSResource";
import { SubnetId } from "./Subnet";
import { SecurityGroupId } from "./SecurityGroup";

interface IEC2 {
  securityGroupIds: SecurityGroupId[];
  subnetId: SubnetId;
}

export class EC2 extends AWSResource<IEC2> {
  readonly id: EC2Id;

  constructor(init: { id?: string; properties: IEC2 }) {
    super(init.properties);
    this.id = new EC2Id(init.id);
  }
}

export class EC2Id extends Id {}
