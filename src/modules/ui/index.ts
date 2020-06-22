import { actions } from "./actions";
import { reducer } from "./reducers";
import { selectors } from "./selectors";
import { ModalTypes } from "./types";

interface IModalState {
  isOpen: boolean;
  type: ModalTypes;
}

export interface IUIState {
  modal: IModalState;
}

export { actions as uiActions, reducer as uiReducer, selectors as uiSelectors };
