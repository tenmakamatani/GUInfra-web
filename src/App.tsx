import * as React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import { store, history } from "./modules/store";

import { IndexPage } from "./views/pages/IndexPage";

export const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={IndexPage} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};
