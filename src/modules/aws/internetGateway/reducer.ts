import { defaultResourceViewCreator } from "../../uiType";
import { IAWSState } from "../index";
import { InternetGatewayActions } from "./actions";
import { ActionTypes } from "../types";

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
      const removedinternetGatewayList = state.internetGatewayList.filter(
        v => !v.resource.id.isEqualTo(action.payload)
      );
      return {
        ...state,
        internetGatewayList: removedinternetGatewayList
      };
    default:
      return state;
  }
};
