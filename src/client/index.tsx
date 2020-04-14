import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { configureStore } from "./modules/store";

import { App } from "./app";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
