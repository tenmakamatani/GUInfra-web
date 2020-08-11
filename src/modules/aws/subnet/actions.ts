import { Action } from "redux";
import { ActionTypes } from "../types";
import { ISubnetView } from "../resources";
import { SubnetId } from "@libs/domain/models/aws/Subnet";

type ISubnetAction = Action<ActionTypes> & {
  resource: "subnet";
};

interface IUpdateSubnetPayload {
  subnetId: SubnetId;
  subnetView: Partial<ISubnetView>;
}

interface ICreateSubnet extends ISubnetAction {
  type: ActionTypes.CreateSubnet;
  payload: ISubnetView;
}
interface IUpdateSubnet extends ISubnetAction {
  type: ActionTypes.UpdateSubnet;
  payload: IUpdateSubnetPayload;
}
interface IRemoveSubnet extends ISubnetAction {
  type: ActionTypes.RemoveSubnet;
  payload: ISubnetView["resource"]["id"];
}

const create = (payload: ICreateSubnet["payload"]): ICreateSubnet => ({
  resource: "subnet",
  type: ActionTypes.CreateSubnet,
  payload: payload
});
const update = (payload: IUpdateSubnet["payload"]): IUpdateSubnet => ({
  resource: "subnet",
  type: ActionTypes.UpdateSubnet,
  payload: payload
});
const remove = (payload: IRemoveSubnet["payload"]): IRemoveSubnet => ({
  resource: "subnet",
  type: ActionTypes.RemoveSubnet,
  payload: payload
});

export const subnetActions = {
  create,
  update,
  remove
};

export type SubnetActions = ICreateSubnet | IUpdateSubnet | IRemoveSubnet;
