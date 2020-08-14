import { Action } from "redux";
import { ActionTypes } from "../types";
import { IRouteTableView } from "../resources";
import { RouteTableId } from "@libs/domain/models/aws/RouteTable";

type IRouteTableAction = Action<ActionTypes> & {
  resource: "routeTable";
};

interface IUpdateRouteTablePayload {
  routeTableId: RouteTableId;
  routeTableView: Partial<IRouteTableView>;
}

interface ICreateRouteTable extends IRouteTableAction {
  type: ActionTypes.CreateRouteTable;
  payload: IRouteTableView;
}
interface IUpdateRouteTable extends IRouteTableAction {
  type: ActionTypes.UpdateRouteTable;
  payload: IUpdateRouteTablePayload;
}
interface IRemoveRouteTable extends IRouteTableAction {
  type: ActionTypes.RemoveRouteTable;
  payload: IRouteTableView["resource"]["id"];
}

const create = (payload: ICreateRouteTable["payload"]): ICreateRouteTable => ({
  resource: "routeTable",
  type: ActionTypes.CreateRouteTable,
  payload: payload
});
const update = (payload: IUpdateRouteTable["payload"]): IUpdateRouteTable => ({
  resource: "routeTable",
  type: ActionTypes.UpdateRouteTable,
  payload: payload
});
const remove = (payload: IRemoveRouteTable["payload"]): IRemoveRouteTable => ({
  resource: "routeTable",
  type: ActionTypes.RemoveRouteTable,
  payload: payload
});

export const routeTableActions = {
  create,
  update,
  remove
};

export type RouteTableActions =
  | ICreateRouteTable
  | IUpdateRouteTable
  | IRemoveRouteTable;
