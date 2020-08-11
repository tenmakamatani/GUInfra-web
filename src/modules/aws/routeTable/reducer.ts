import { IAWSState } from "../index";
import { RouteTableActions } from "./actions";
import { ActionTypes } from "../types";

export const routeTableReducer = (
  state: IAWSState,
  action: RouteTableActions
): IAWSState => {
  switch (action.type) {
    case ActionTypes.CreateRouteTable:
      return {
        ...state,
        routeTableList: [...state.routeTableList, action.payload]
      };
    case ActionTypes.UpdateRouteTable:
      const updatedrouteTableList = state.routeTableList.map(v => {
        if (v.resource.id.isEqualTo(action.payload.routeTableId))
          return {
            ...v,
            ...action.payload.routeTableView
          };
        return v;
      });
      return {
        ...state,
        routeTableList: updatedrouteTableList
      };
    case ActionTypes.RemoveRouteTable:
      const removedrouteTableList = state.routeTableList.filter(
        v => !v.resource.id.isEqualTo(action.payload)
      );
      return {
        ...state,
        routeTableList: removedrouteTableList
      };
    default:
      return state;
  }
};
