import { IUIState } from "./index";
import { UIActions } from "./actions";
import { ActionTypes, ModalTypes } from "./types";

const initialState: IUIState = {
  modal: {
    isOpen: true,
    type: ModalTypes.VPCForm
  }
};

export const reducer = (
  state: IUIState = initialState,
  action: UIActions
): IUIState => {
  switch (action.type) {
    case ActionTypes.AppearModal:
      return {
        ...state,
        modal: {
          isOpen: true,
          type: action.payload.modalType
        }
      };
    case ActionTypes.RemoveModal:
      return {
        ...state,
        modal: {
          isOpen: false,
          type: ModalTypes.NotOpen
        }
      };
    default:
      return state;
  }
};
