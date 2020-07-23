import { ec2Actions as ec2, EC2Actions } from "./ec2";
import { vpcActions as vpc, VPCActions } from "./vpc";

export type AWSActions = EC2Actions | VPCActions;

export const actions = {
  ec2,
  vpc
};
