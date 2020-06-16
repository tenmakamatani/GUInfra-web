import * as React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import { store, history } from "./modules/store";

const Test = () => {
  return <h1>Test</h1>;
};

export const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Test} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};
