import { Action } from "redux";
import { ActionTypes } from "../types";
import { IVPCView } from "../resources";
import { VPCId } from "@libs/domain/models/aws/VPC";

type IVPCAction = Action<ActionTypes> & {
  resource: "vpc";
};

interface IUpdateVPCPayload {
  vpcId: VPCId;
  vpcView: Partial<IVPCView>;
}

interface ICreateVPC extends IVPCAction {
  type: ActionTypes.CreateVPC;
  payload: IVPCView;
}
interface IUpdateVPC extends IVPCAction {
  type: ActionTypes.UpdateVPC;
  payload: IUpdateVPCPayload;
}
interface IRemoveVPC extends IVPCAction {
  type: ActionTypes.RemoveVPC;
  payload: IVPCView["resource"]["id"];
}

const create = (payload: ICreateVPC["payload"]): ICreateVPC => ({
  resource: "vpc",
  type: ActionTypes.CreateVPC,
  payload: payload
});
const update = (payload: IUpdateVPC["payload"]): IUpdateVPC => ({
  resource: "vpc",
  type: ActionTypes.UpdateVPC,
  payload: payload
});
const remove = (payload: IRemoveVPC["payload"]): IRemoveVPC => ({
  resource: "vpc",
  type: ActionTypes.RemoveVPC,
  payload: payload
});

export const vpcActions = {
  create,
  update,
  remove
};

export type VPCActions = ICreateVPC | IUpdateVPC | IRemoveVPC;
