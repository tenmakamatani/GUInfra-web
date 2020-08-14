import { IStore } from "../store";
import { IUIState } from "./index";

const modal = (store: IStore): IUIState["modal"] => {
  return store.ui.modal;
};

export const selectors = {
  modal
};
