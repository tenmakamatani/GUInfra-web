import * as React from "react";

import { styles } from "./styles";

export const Header: React.SFC = () => {
  return (
    <header>
      <div css={styles.wrapper}>
        <button>実行</button>
      </div>
    </header>
  );
};
