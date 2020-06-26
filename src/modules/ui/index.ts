import { AllResource } from "@libs/domain/models";

import { actions } from "./actions";
import { reducer } from "./reducers";
import { selectors } from "./selectors";
import { ModalTypes } from "./types";

export interface IModalState {
  isOpen: boolean;
  type: ModalTypes;
  resource?: AllResource;
}

export interface IUIState {
  modal: IModalState;
}

export {
  actions as uiActions,
  reducer as uiReducer,
  selectors as uiSelectors,
  ModalTypes
};
