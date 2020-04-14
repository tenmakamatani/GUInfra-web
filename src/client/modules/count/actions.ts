import { Action } from "redux";
import { ActionTypes } from "./types";

interface ICountAction extends Action<ActionTypes> {}

export interface IRequestGet extends ICountAction {
  type: ActionTypes.REQUEST_GET;
}
export interface ISuccessGet extends ICountAction {
  type: ActionTypes.SUCCESS_GET;
  payload: number;
}
export interface IFailureGet extends ICountAction {
  type: ActionTypes.FAILURE_GET;
}

export const requestGet = (): IRequestGet => ({
  type: ActionTypes.REQUEST_GET
});
export const successGet = (payload: ISuccessGet["payload"]): ISuccessGet => ({
  type: ActionTypes.SUCCESS_GET,
  payload: payload
});
export const failureGet = (): IFailureGet => ({
  type: ActionTypes.FAILURE_GET
});

export const actions = {
  requestGet,
  successGet,
  failureGet
};
export type Actions = IRequestGet | ISuccessGet | IFailureGet;
