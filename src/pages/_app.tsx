import * as React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import { store } from "@modules/store";
import { AppTemplate } from "@components/templates/AppTemplate";
import { Modal } from "@components/organisms/Modal";

export default class GUInfra extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <style global jsx>{`
          body {
            height: 100vh;
          }
          div#__next {
            height: 100vh;
          }
        `}</style>
        <AppTemplate>
          <Modal />
          <Component {...pageProps} />
        </AppTemplate>
      </Provider>
    );
  }
}