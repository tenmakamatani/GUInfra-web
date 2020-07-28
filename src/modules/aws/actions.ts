import { ec2Actions as ec2, EC2Actions } from "./ec2";
import { vpcActions as vpc, VPCActions } from "./vpc";
import {
  securityGroupActions as securityGroup,
  SecurityGroupActions
} from "./securityGroup";

export type AWSActions = EC2Actions | VPCActions | SecurityGroupActions;

export const actions = {
  ec2,
  vpc,
  securityGroup
};
