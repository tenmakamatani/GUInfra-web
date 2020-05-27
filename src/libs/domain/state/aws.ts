import { VPC } from "../models/aws";

export interface IAWSState {
  metadata: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  };
  vpcList: VPC[];
}
