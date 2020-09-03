import { defaultResourceViewCreator } from "../../uiType";
import { IAWSState } from "../index";
import { VPCActions } from "./actions";
import { ActionTypes } from "../types";
import { canRemoveVpc } from "../relations";
import { toast } from "@libs/application/utils";

export const vpcReducer = (state: IAWSState, action: VPCActions): IAWSState => {
  switch (action.type) {
    case ActionTypes.CreateVPC:
      return {
        ...state,
        vpcList: [...state.vpcList, defaultResourceViewCreator(action.payload)]
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
      const vpcId = action.payload;
      if (!canRemoveVpc(state, vpcId)) {
        toast.error("このVPCは削除できません");
        return state;
      }
      const removedVpcList = state.vpcList.filter(
        v => !v.resource.id.isEqualTo(vpcId)
      );
      return {
        ...state,
        vpcList: removedVpcList
      };
    default:
      return state;
  }
};
