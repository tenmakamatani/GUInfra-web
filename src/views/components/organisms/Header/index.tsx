import * as React from "react";
import { useDispatch } from "react-redux";
import { ModalTypes, uiActions } from "@modules/ui";

import { styles } from "./styles";

export const Header: React.SFC = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      uiActions.appearModal({
        type: ModalTypes.MetadataForm
      })
    );
  };

  return (
    <header>
      <div css={styles.wrapper}>
        <button onClick={handleClick}>実行</button>
      </div>
    </header>
  );
};
