import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { IState as ICountState, countRootSaga, countReducer } from "./count";

export interface IStore {
  count: ICountState;
}

export const configureStore = (initialState?: IStore): Store => {
  const sagaMiddleware = createSagaMiddleware();
  const reducer = combineReducers({
    count: countReducer
  });
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(countRootSaga);
  return store;
};
