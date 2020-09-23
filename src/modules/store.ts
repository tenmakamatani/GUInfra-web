import { createStore, combineReducers, Store } from "redux";
import { IUIState, uiReducer } from "./ui";
import { IAWSState, awsReducer } from "./aws";

export interface IStore {
  ui: IUIState;
  aws: IAWSState;
}

const configureStore = (initialStore?: IStore): Store => {
  // Reducerの作成
  const reducer = combineReducers({
    ui: uiReducer,
    aws: awsReducer
  });
  // Storeの作成
  const store = createStore(reducer, initialStore);
  return store;
};
console.log("aaa");
const store = configureStore();
export { store };
