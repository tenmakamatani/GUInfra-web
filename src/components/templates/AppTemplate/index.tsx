import * as React from "react";

import { Header } from "../../organisms/Header";

export const AppTemplate: React.SFC = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};
