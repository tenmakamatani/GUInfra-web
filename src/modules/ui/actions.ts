import { Action } from "redux";
import { ActionTypes, ModalTypes } from "./types";

type IUIAction = Action<ActionTypes>;

interface IAppearModal extends IUIAction {
  type: ActionTypes.AppearModal;
  payload: {
    modalType: ModalTypes;
  };
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
