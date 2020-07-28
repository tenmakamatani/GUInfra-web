import { EC2, VPC, SecurityGroup } from "./aws";

export type AllResource = EC2 | VPC | SecurityGroup;
export type EntityResource = EC2;
export type ScopeResource = VPC;
export type AttachResource = SecurityGroup;
