import { EC2, VPC } from "@libs/domain/models/aws";

import { withBaseUI } from "../uiType";

export interface IEC2View extends withBaseUI<EC2> {}
export interface IVPCView extends withBaseUI<VPC> {}

export type IResourceView = IEC2View | IVPCView;
