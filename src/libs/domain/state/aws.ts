import { EC2, VPC, SecurityGroup } from "../models/aws";

export interface IAWSState {
  metadata: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  };
  ec2List: EC2[];
  vpcList: VPC[];
  securityGroupList: SecurityGroup[];
}
