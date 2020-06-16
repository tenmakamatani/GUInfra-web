import { IAWSState } from "./index";
import { AWSActions } from "./actions";
import { ActionTypes } from "./types";

import { vpcReducer } from "./vpc";

const initialState: IAWSState = {
  metadata: {
    region: "",
    accessKeyId: "",
    secretAccessKey: ""
  },
  vpcList: []
};

export const reducer = (
  state: IAWSState = initialState,
  action: AWSActions
): IAWSState => {
  const type = action.type;
  // VPCのReducerを発火
  if (
    type === ActionTypes.CreateVPC ||
    type === ActionTypes.UpdateVPC ||
    type === ActionTypes.DeleteVPC
  )
    return vpcReducer(state, action);
  return state;
};
