import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import { IAWSState, awsReducer } from "./aws";

export interface IStore {
  aws: IAWSState;
}

const history = createBrowserHistory();

const configureStore = (initialStore?: IStore): Store => {
  // Reducerの作成
  const reducer = combineReducers({
    router: connectRouter(history),
    aws: awsReducer
  });
  // Storeの作成
  const store = createStore(
    reducer,
    initialStore,
    applyMiddleware(routerMiddleware(history))
  );
  return store;
};

const store = configureStore();
export { store, history };
