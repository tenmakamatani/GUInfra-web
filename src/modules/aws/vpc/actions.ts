import { Action } from "redux";
import { ActionTypes } from "../types";
import { IVPCView } from "../resources";
import { VPCId } from "@libs/domain/models/aws/VPC";

const vpcActionTypeList = [
  ActionTypes.CreateVPC,
  ActionTypes.UpdateVPC,
  ActionTypes.DeleteVPC
] as const;

type IVPCAction = Action<typeof vpcActionTypeList[number]>;

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
interface IDeleteVPC extends IVPCAction {
  type: ActionTypes.DeleteVPC;
  payload: IVPCView["resource"]["id"];
}

const create = (vpcView: IVPCView): ICreateVPC => ({
  type: ActionTypes.CreateVPC,
  payload: vpcView
});
const update = (payload: IUpdateVPCPayload): IUpdateVPC => ({
  type: ActionTypes.UpdateVPC,
  payload: payload
});
const remove = (vpcId: IVPCView["resource"]["id"]): IDeleteVPC => ({
  type: ActionTypes.DeleteVPC,
  payload: vpcId
});

export { vpcActionTypeList };

export const actions = {
  create,
  update,
  remove
};

export type VPCActions = ICreateVPC | IUpdateVPC | IDeleteVPC;
