import { IAWSState } from "../index";
import { EC2Actions } from "./actions";
import { ActionTypes } from "../types";

export const ec2Reducer = (state: IAWSState, action: EC2Actions): IAWSState => {
  switch (action.type) {
    case ActionTypes.CreateEC2:
      return {
        ...state,
        ec2List: [...state.ec2List, action.payload]
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
      const removedEc2List = state.ec2List.filter(
        v => !v.resource.id.isEqualTo(action.payload)
      );
      return {
        ...state,
        ec2List: removedEc2List
      };
    default:
      return state;
  }
};
