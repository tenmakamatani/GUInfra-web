import { defaultResourceViewCreator } from "../../uiType";
import { IAWSState } from "../index";
import { InternetGatewayActions } from "./actions";
import { ActionTypes } from "../types";
import { canRemoveInternetGateway } from "../relations";
import { toast } from "@libs/application/utils";

export const internetGatewayReducer = (
  state: IAWSState,
  action: InternetGatewayActions
): IAWSState => {
  switch (action.type) {
    case ActionTypes.CreateInternetGateway:
      return {
        ...state,
        internetGatewayList: [
          ...state.internetGatewayList,
          defaultResourceViewCreator(action.payload)
        ]
      };
    case ActionTypes.UpdateInternetGateway:
      const updatedinternetGatewayList = state.internetGatewayList.map(v => {
        if (v.resource.id.isEqualTo(action.payload.internetGatewayId))
          return {
            ...v,
            ...action.payload.internetGatewayView
          };
        return v;
      });
      return {
        ...state,
        internetGatewayList: updatedinternetGatewayList
      };
    case ActionTypes.RemoveInternetGateway:
      const internetGatewayId = action.payload;
      if (!canRemoveInternetGateway(state, internetGatewayId)) {
        toast.error("このInternetGatewayは削除できません");
        return state;
      }
      const removedinternetGatewayList = state.internetGatewayList.filter(
        v => !v.resource.id.isEqualTo(internetGatewayId)
      );
      return {
        ...state,
        internetGatewayList: removedinternetGatewayList
      };
    default:
      return state;
  }
};
