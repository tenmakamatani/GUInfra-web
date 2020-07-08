import { EC2, VPC } from "./aws";

export type AllResource = EC2 | VPC;
export type EntityResource = EC2;
export type ScopeResource = VPC;
