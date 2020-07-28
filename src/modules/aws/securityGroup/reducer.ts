import { IAWSState } from "../index";
import { SecurityGroupActions } from "./actions";
import { ActionTypes } from "../types";

export const securityGroupReducer = (
  state: IAWSState,
  action: SecurityGroupActions
): IAWSState => {
  switch (action.type) {
    case ActionTypes.CreateSecurityGroup:
      return {
        ...state,
        securityGroupList: [...state.securityGroupList, action.payload]
      };
    case ActionTypes.UpdateSecurityGroup:
      const updatedSecurityGroupList = state.securityGroupList.map(s => {
        if (s.resource.id.isEqualTo(action.payload.securityGroupId)) {
          return {
            ...s,
            ...action.payload.securityGroupView
          };
        }
        return s;
      });
      return {
        ...state,
        securityGroupList: updatedSecurityGroupList
      };
    case ActionTypes.RemoveSecurityGroup:
      const removedSecurityGroupList = state.securityGroupList.filter(
        s => !s.resource.id.isEqualTo(action.payload)
      );
      return {
        ...state,
        securityGroupList: removedSecurityGroupList
      };
    default:
      return state;
  }
};
