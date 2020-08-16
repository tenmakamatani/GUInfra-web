import { Id } from "../base";
import { AWSResource } from "./common/AWSResource";

export type IpPermissionType = "ssh" | "http" | "https" | "all";

interface IIpPermissions {
  type: IpPermissionType;
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

  constructor(init: { id?: string; properties: ISecurityGroup }) {
    super(init.properties);
    this.id = new SecurityGroupId(init.id);
  }
}

export class SecurityGroupId extends Id {}
