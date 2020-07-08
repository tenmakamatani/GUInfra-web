import { IAWSState } from "./index";
import { AWSActions } from "./actions";

import { ec2Reducer } from "./ec2";
import { vpcReducer } from "./vpc";

const initialState: IAWSState = {
  metadata: {
    region: "",
    accessKeyId: "",
    secretAccessKey: ""
  },
  ec2List: [],
  vpcList: []
};

export const reducer = (
  state: IAWSState = initialState,
  action: AWSActions
): IAWSState => {
  // リソースに応じてReducerを発火
  if (action.resource === "ec2") return ec2Reducer(state, action);
  if (action.resource === "vpc") return vpcReducer(state, action);
  return state;
};
