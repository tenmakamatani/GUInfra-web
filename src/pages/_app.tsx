import * as React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isMobile } from "react-device-detect";
import App from "next/app";
import { DI } from "@libs/application/DI";
import { store } from "@modules/store";
import { ForMobilePage } from "@components/pages";
import { AppTemplate } from "@components/templates/AppTemplate";
import { Modal } from "@components/organisms/Modal";

export default class GUInfra extends App {
  render() {
    // TODO: 直す、Analyticsを実行させるため
    DI.setup({
      accessKeyId: "",
      secretAccessKey: "",
      region: ""
    });
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
        {
          isMobile ? 
          (
            <ForMobilePage />
          ) :
          (
            <AppTemplate>
              <Modal />
              <ToastContainer
                position="bottom-center"
                autoClose={false}
                closeOnClick
              />
              <Component {...pageProps} />
            </AppTemplate>
          )
        }
      </Provider>
    );
  }
}
