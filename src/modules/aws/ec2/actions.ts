import { Action } from "redux";
import { ActionTypes } from "../types";
import { IEC2View } from "../resources";
import { EC2Id } from "@libs/domain/models/aws/EC2";

type IEC2Action = Action<ActionTypes> & {
  resource: "ec2";
};

interface ICreateEC2 extends IEC2Action {
  type: ActionTypes.CreateEC2;
  payload: IEC2View["resource"];
}
interface IUpdateEC2 extends IEC2Action {
  type: ActionTypes.UpdateEC2;
  payload: {
    ec2Id: EC2Id;
    ec2View: Partial<IEC2View>;
  };
}
interface IRemoveEC2 extends IEC2Action {
  type: ActionTypes.RemoveEC2;
  payload: IEC2View["resource"]["id"];
}

const create = (payload: ICreateEC2["payload"]): ICreateEC2 => ({
  resource: "ec2",
  type: ActionTypes.CreateEC2,
  payload: payload
});
const update = (payload: IUpdateEC2["payload"]) => ({
  resource: "ec2",
  type: ActionTypes.UpdateEC2,
  payload: payload
});
const remove = (payload: IRemoveEC2["payload"]): IRemoveEC2 => ({
  resource: "ec2",
  type: ActionTypes.RemoveEC2,
  payload: payload
});

export const ec2Actions = {
  create,
  update,
  remove
};

export type EC2Actions = ICreateEC2 | IUpdateEC2 | IRemoveEC2;
