import { Action } from "redux";
import { ActionTypes } from "../types";

type ISampleAction = Action<ActionTypes> & {
  resource: "sample";
}

interface ICreateSample extends ISampleAction {
  type: ActionTypes.CreateSample,
}

const create = (): ICreateSample => ({
  resource: "sample",
  type: ActionTypes.CreateSample
});

export const sampleActions = {
  create,
}

export type SampleActions = ICreateSample;
