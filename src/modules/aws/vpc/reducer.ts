import { IAWSState } from "../index";
import { VPCActions } from "./actions";
import { ActionTypes } from "../types";

export const reducer = (state: IAWSState, action: VPCActions): IAWSState => {
  switch (action.type) {
    case ActionTypes.CreateVPC:
      return {
        ...state,
        vpcList: [...state.vpcList, action.payload]
      };
    case ActionTypes.UpdateVPC:
      const updatedVpcList = state.vpcList.map(v => {
        if (v.resource.id.isEqualTo(action.payload.vpcId))
          return {
            ...v,
            ...action.payload.vpcView
          };
        return v;
      });
      return {
        ...state,
        vpcList: updatedVpcList
      };
    case ActionTypes.RemoveVPC:
      const removedVpcList = state.vpcList.filter(
        v => !v.resource.id.isEqualTo(action.payload)
      );
      return {
        ...state,
        vpcList: removedVpcList
      };
    default:
      return state;
  }
};
