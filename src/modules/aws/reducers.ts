import { IAWSState } from "./index";
import { AWSActions } from "./actions";

import { vpcReducer, VPCActionTypeList } from "./vpc";

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
  // リソースに応じてReducerを発火
  if (type in VPCActionTypeList) return vpcReducer(state, action);
  return state;
};
