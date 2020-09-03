import { defaultResourceViewCreator } from "../../uiType";
import { IAWSState } from "../index";
import { EC2Actions } from "./actions";
import { ActionTypes } from "../types";
import { canRemoveEc2 } from "../relations";
import { toast } from "@libs/application/utils";

export const ec2Reducer = (state: IAWSState, action: EC2Actions): IAWSState => {
  switch (action.type) {
    case ActionTypes.CreateEC2:
      return {
        ...state,
        ec2List: [...state.ec2List, defaultResourceViewCreator(action.payload)]
      };
    case ActionTypes.UpdateEC2:
      const updatedEc2List = state.ec2List.map(v => {
        if (v.resource.id.isEqualTo(action.payload.ec2Id)) {
          return {
            ...v,
            ...action.payload.ec2View
          };
        }
        return v;
      });
      return {
        ...state,
        ec2List: updatedEc2List
      };
    case ActionTypes.RemoveEC2:
      const ec2Id = action.payload;
      if (!canRemoveEc2(state, ec2Id)) {
        toast.error("このEC2は削除できません");
        return state;
      }
      const removedEc2List = state.ec2List.filter(
        v => !v.resource.id.isEqualTo(ec2Id)
      );
      return {
        ...state,
        ec2List: removedEc2List
      };
    default:
      return state;
  }
};
