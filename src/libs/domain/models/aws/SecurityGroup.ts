import { Id } from "../base";
import { AWSResource, ITag } from "./common/AWSResource";

interface IIpPermissions {
  protocol: "tcp";
  fromPort: number;
  toPort: number;
  ipRanges: string[];
}

interface ISecurityGroup {
  name: string;
  description: string;
  permissions: {
    ingress: IIpPermissions[];
    egress: IIpPermissions[];
  };
}

export class SecurityGroup extends AWSResource<ISecurityGroup> {
  readonly id: SecurityGroupId;

  constructor(init: { id?: string; properties: ISecurityGroup; tags: ITag[] }) {
    super(init);
    this.id = new SecurityGroupId(init.id);
  }
}

export class SecurityGroupId extends Id {}
