import { EC2, VPC } from "../models/aws";

export interface IAWSState {
  metadata: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  };
  ec2List: EC2[];
  vpcList: VPC[];
}
