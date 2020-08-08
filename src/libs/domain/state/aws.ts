import { EC2, VPC, Subnet, SecurityGroup } from "../models/aws";

export interface IAWSState {
  metadata: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  };
  ec2List: EC2[];
  vpcList: VPC[];
  subnetList: Subnet[];
  securityGroupList: SecurityGroup[];
}
