import { IStore } from "../store";
import { IState } from "./";

export const selectCountState = (store: IStore): IState => store.count;
