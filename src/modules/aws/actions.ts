import { EC2Actions, ec2Actions as ec2 } from "./ec2";
import { VPCActions, vpcActions as vpc } from "./vpc";

export const actions = {
  ec2,
  vpc
};

export type AWSActions = EC2Actions | VPCActions;
