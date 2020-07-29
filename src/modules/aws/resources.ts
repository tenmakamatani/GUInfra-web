import { EC2, VPC, SecurityGroup } from "@libs/domain/models/aws";

import { withBaseUI, withoutBaseUI } from "../uiType";

export interface IEC2View extends withBaseUI<EC2> {}
export interface IVPCView extends withBaseUI<VPC> {}
export interface ISecurityGroupView extends withoutBaseUI<SecurityGroup> {}

export type IWithUIResourceView = IEC2View | IVPCView;
export type IWithoutUIResourceView = ISecurityGroupView;
