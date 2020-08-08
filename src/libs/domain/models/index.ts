import {
  EC2,
  VPC,
  Subnet,
  RouteTable,
  SecurityGroup,
  InternetGateway
} from "./aws";

export type AllResource =
  | EC2
  | VPC
  | Subnet
  | RouteTable
  | SecurityGroup
  | InternetGateway;
export type EntityResource = EC2;
export type ScopeResource = VPC | Subnet;
export type AttachResource = RouteTable | SecurityGroup | InternetGateway;
