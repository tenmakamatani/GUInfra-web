import { ec2Actions as ec2, EC2Actions } from "./ec2";
import { vpcActions as vpc, VPCActions } from "./vpc";
import { subnetActions as subnet, SubnetActions } from "./subnet";
import {
  routeTableActions as routeTable,
  RouteTableActions
} from "./routeTable";
import {
  securityGroupActions as securityGroup,
  SecurityGroupActions
} from "./securityGroup";
import {
  internetGatewayActions as internetGateway,
  InternetGatewayActions
} from "./internetGateway";
import { sampleActions as sample, SampleActions } from "./sample";

export type AWSActions =
  | EC2Actions
  | VPCActions
  | SubnetActions
  | RouteTableActions
  | SecurityGroupActions
  | InternetGatewayActions
  | SampleActions;

export const actions = {
  ec2,
  vpc,
  subnet,
  routeTable,
  securityGroup,
  internetGateway,
  sample,
};
