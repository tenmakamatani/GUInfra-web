import * as React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
            font-family: Avenir Heavy;
          }
        `}</style>
        <AppTemplate>
          <Modal />
          <ToastContainer
            position="bottom-center"
            autoClose={false}
            closeOnClick
          />
          <Component {...pageProps} />
        </AppTemplate>
      </Provider>
    );
  }
}
