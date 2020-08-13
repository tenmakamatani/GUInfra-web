import { defaultResourceViewCreator } from "../../uiType";
import { IAWSState } from "../index";
import { SubnetActions } from "./actions";
import { ActionTypes } from "../types";

export const subnetReducer = (
  state: IAWSState,
  action: SubnetActions
): IAWSState => {
  switch (action.type) {
    case ActionTypes.CreateSubnet:
      return {
        ...state,
        subnetList: [
          ...state.subnetList,
          defaultResourceViewCreator(action.payload)
        ]
      };
    case ActionTypes.UpdateSubnet:
      const updatedsubnetList = state.subnetList.map(v => {
        if (v.resource.id.isEqualTo(action.payload.subnetId))
          return {
            ...v,
            ...action.payload.subnetView
          };
        return v;
      });
      return {
        ...state,
        subnetList: updatedsubnetList
      };
    case ActionTypes.RemoveSubnet:
      const removedsubnetList = state.subnetList.filter(
        v => !v.resource.id.isEqualTo(action.payload)
      );
      return {
        ...state,
        subnetList: removedsubnetList
      };
    default:
      return state;
  }
};
