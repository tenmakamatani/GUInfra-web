import {
  EC2,
  VPC,
  Subnet,
  RouteTable,
  SecurityGroup,
  InternetGateway
} from "../models/aws";

export interface IAWSState {
  metadata: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  };
  ec2List: EC2[];
  vpcList: VPC[];
  subnetList: Subnet[];
  routeTableList: RouteTable[];
  securityGroupList: SecurityGroup[];
  internetGatewayList: InternetGateway[];
}
