import { actions } from "./actions";
import { reducer } from "./reducers";
import { rootSaga } from "./sagas";
import { ActionTypes } from "./types";

export interface IState {
  isFetching: boolean;
  count: number;
  error: string;
}

export {
  actions as countActions,
  reducer as countReducer,
  rootSaga as countRootSaga,
  ActionTypes as countActionTypes
};
