import { Action } from "redux";
import { IModalState } from "./index";
import { ActionTypes } from "./types";

type IUIAction = Action<ActionTypes>;

interface IAppearModal extends IUIAction {
  type: ActionTypes.AppearModal;
  payload: Omit<IModalState, "isOpen">;
}
interface IRemoveModal extends IUIAction {
  type: ActionTypes.RemoveModal;
}

const appearModal = (payload: IAppearModal["payload"]): IAppearModal => ({
  type: ActionTypes.AppearModal,
  payload: payload
});
const removeModal = (): IRemoveModal => ({
  type: ActionTypes.RemoveModal
});

export const actions = {
  appearModal,
  removeModal
};
export type UIActions = IAppearModal | IRemoveModal;
