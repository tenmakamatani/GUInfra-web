import { IAWSState as DomainAWSState } from "@libs/domain/state/aws";

import { IEC2View, IVPCView, ISecurityGroupView } from "./resources";

import { actions } from "./actions";
import { reducer } from "./reducers";
import { selectors } from "./selectors";
import { ActionTypes } from "./types";

export interface IAWSState {
  metadata: DomainAWSState["metadata"];
  ec2List: IEC2View[];
  vpcList: IVPCView[];
  securityGroupList: ISecurityGroupView[];
}

export {
  actions as awsActions,
  reducer as awsReducer,
  selectors as awsSelector,
  ActionTypes as AWSActionTypes
};
