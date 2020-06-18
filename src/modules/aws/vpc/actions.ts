import { Action } from "redux";
import { ActionTypes } from "../types";
import { IVPCView } from "../resources";

const VPCActionTypeList = [
  ActionTypes.CreateVPC,
  ActionTypes.UpdateVPC,
  ActionTypes.DeleteVPC
] as const;

type IVPCAction = Action<typeof VPCActionTypeList[number]>;

interface ICreateVPC extends IVPCAction {
  type: ActionTypes.CreateVPC;
  payload: IVPCView;
}
interface IUpdateVPC extends IVPCAction {
  type: ActionTypes.UpdateVPC;
  payload: IVPCView;
}
interface IDeleteVPC extends IVPCAction {
  type: ActionTypes.DeleteVPC;
  payload: IVPCView["resource"]["id"];
}

const createVPC = (vpcView: IVPCView): ICreateVPC => ({
  type: ActionTypes.CreateVPC,
  payload: vpcView
});
const updateVPC = (vpcView: IVPCView): IUpdateVPC => ({
  type: ActionTypes.UpdateVPC,
  payload: vpcView
});
const deleteVPC = (vpcId: IVPCView["resource"]["id"]): IDeleteVPC => ({
  type: ActionTypes.DeleteVPC,
  payload: vpcId
});

export { VPCActionTypeList };

export const actions = {
  createVPC,
  updateVPC,
  deleteVPC
};

export type VPCActions = ICreateVPC | IUpdateVPC | IDeleteVPC;
