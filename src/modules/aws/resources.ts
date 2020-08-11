import {
  EC2,
  VPC,
  SecurityGroup,
  Subnet,
  RouteTable,
  InternetGateway
} from "@libs/domain/models/aws";

import { withBaseUI, withoutBaseUI } from "../uiType";

export interface IEC2View extends withBaseUI<EC2> {}
export interface IVPCView extends withBaseUI<VPC> {}
export interface ISubnetView extends withBaseUI<Subnet> {}
export interface IRouteTableView extends withoutBaseUI<RouteTable> {}
export interface ISecurityGroupView extends withoutBaseUI<SecurityGroup> {}
export interface IInternetGatewayView extends withBaseUI<InternetGateway> {}

export type IWithUIResourceView =
  | IEC2View
  | IVPCView
  | ISubnetView
  | IInternetGatewayView;
export type IWithoutUIResourceView = IRouteTableView | ISecurityGroupView;
