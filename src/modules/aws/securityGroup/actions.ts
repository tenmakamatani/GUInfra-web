import { Action } from "redux";
import { ActionTypes } from "../types";
import { ISecurityGroupView } from "../resources";
import { SecurityGroupId } from "@libs/domain/models/aws/SecurityGroup";

type ISecurityGroupAction = Action<ActionTypes> & {
  resource: "securityGroup";
};
interface IUpdateSecurityGroupPayload {
  securityGroupId: SecurityGroupId;
  securityGroupView: Partial<ISecurityGroupView>;
}

interface ICreateSecurityGroup extends ISecurityGroupAction {
  type: ActionTypes.CreateSecurityGroup;
  payload: ISecurityGroupView;
}
interface IUpdateSecurityGroup extends ISecurityGroupAction {
  type: ActionTypes.UpdateSecurityGroup;
  payload: IUpdateSecurityGroupPayload;
}
interface IRemoveSecurityGroup extends ISecurityGroupAction {
  type: ActionTypes.RemoveSecurityGroup;
  payload: ISecurityGroupView["resource"]["id"];
}

const create = (
  payload: ICreateSecurityGroup["payload"]
): ICreateSecurityGroup => ({
  resource: "securityGroup",
  type: ActionTypes.CreateSecurityGroup,
  payload: payload
});
const update = (
  payload: IUpdateSecurityGroup["payload"]
): IUpdateSecurityGroup => ({
  resource: "securityGroup",
  type: ActionTypes.UpdateSecurityGroup,
  payload: payload
});
const remove = (
  payload: IRemoveSecurityGroup["payload"]
): IRemoveSecurityGroup => ({
  resource: "securityGroup",
  type: ActionTypes.RemoveSecurityGroup,
  payload: payload
});

export const securityGroupActions = {
  create,
  update,
  remove
};

export type SecurityGroupActions =
  | ICreateSecurityGroup
  | IUpdateSecurityGroup
  | IRemoveSecurityGroup;
