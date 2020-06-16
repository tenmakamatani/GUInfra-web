import { VPC } from "@libs/domain/models/aws";
import { IAWSState as DomainAWSState } from "@libs/domain/state/aws";

import { withBaseUI } from "../UIType";

import { actions } from "./actions";
import { reducer } from "./reducers";
import { ActionTypes } from "./types";

export interface IAWSState {
  metadata: DomainAWSState["metadata"];
  vpcList: withBaseUI<VPC>[];
}

export {
  actions as awsActions,
  reducer as awsReducer,
  ActionTypes as AWSActionTypes
};
