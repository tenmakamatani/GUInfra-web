import { Action } from "redux";
import { ActionTypes } from "../types";
import { IInternetGatewayView } from "../resources";
import { InternetGatewayId } from "@libs/domain/models/aws/InternetGateway";

type IInternetGatewayAction = Action<ActionTypes> & {
  resource: "internetGateway";
};

interface IUpdateInternetGatewayPayload {
  internetGatewayId: InternetGatewayId;
  internetGatewayView: Partial<IInternetGatewayView>;
}

interface ICreateInternetGateway extends IInternetGatewayAction {
  type: ActionTypes.CreateInternetGateway;
  payload: IInternetGatewayView["resource"];
}
interface IUpdateInternetGateway extends IInternetGatewayAction {
  type: ActionTypes.UpdateInternetGateway;
  payload: IUpdateInternetGatewayPayload;
}
interface IRemoveInternetGateway extends IInternetGatewayAction {
  type: ActionTypes.RemoveInternetGateway;
  payload: IInternetGatewayView["resource"]["id"];
}

const create = (
  payload: ICreateInternetGateway["payload"]
): ICreateInternetGateway => ({
  resource: "internetGateway",
  type: ActionTypes.CreateInternetGateway,
  payload: payload
});
const update = (
  payload: IUpdateInternetGateway["payload"]
): IUpdateInternetGateway => ({
  resource: "internetGateway",
  type: ActionTypes.UpdateInternetGateway,
  payload: payload
});
const remove = (
  payload: IRemoveInternetGateway["payload"]
): IRemoveInternetGateway => ({
  resource: "internetGateway",
  type: ActionTypes.RemoveInternetGateway,
  payload: payload
});

export const internetGatewayActions = {
  create,
  update,
  remove
};

export type InternetGatewayActions =
  | ICreateInternetGateway
  | IUpdateInternetGateway
  | IRemoveInternetGateway;
