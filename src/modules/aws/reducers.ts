import { IAWSState } from "./index";
import { AWSActions } from "./actions";

import { ec2Reducer } from "./ec2";
import { vpcReducer } from "./vpc";
import { subnetReducer } from "./subnet";
import { routeTableReducer } from "./routeTable";
import { securityGroupReducer } from "./securityGroup";
import { internetGatewayReducer } from "./internetGateway";
import { sampleReducer } from "./sample";

const initialState: IAWSState = {
  metadata: {
    region: "",
    accessKeyId: "",
    secretAccessKey: ""
  },
  ec2List: [],
  vpcList: [],
  subnetList: [],
  routeTableList: [],
  securityGroupList: [],
  internetGatewayList: []
};

export const reducer = (
  state: IAWSState = initialState,
  action: AWSActions
): IAWSState => {
  // リソースに応じてReducerを発火
  if (action.resource === "ec2") return ec2Reducer(state, action);
  if (action.resource === "vpc") return vpcReducer(state, action);
  if (action.resource === "subnet") return subnetReducer(state, action);
  if (action.resource === "routeTable") return routeTableReducer(state, action);
  if (action.resource === "securityGroup")
    return securityGroupReducer(state, action);
  if (action.resource === "internetGateway")
    return internetGatewayReducer(state, action);
  if (action.resource === "sample") return sampleReducer(state, action);
  return state;
};
