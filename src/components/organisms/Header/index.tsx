import * as React from "react";
import { useDispatch } from "react-redux";
import { ModalTypes, uiActions } from "@modules/ui";

import { styles } from "./styles";
import { DI } from "@libs/application/DI";

export const Header: React.SFC = () => {
  const dispatch = useDispatch();

  const handleClickCreate = () => {
    dispatch(
      uiActions.appearModal({
        type: ModalTypes.MetadataForm
      })
    );
  };
  const handleClickDelete = () => {
    DI.awsResourceUseCase.deleteAll();
  };

  return (
    <header>
      <div css={styles.wrapper}>
        <div css={styles.titleWrapper}>
          <h1 css={styles.title}>GUInfra</h1>
        </div>
        <div css={styles.buttonsWrapper}>
          <button
            css={[styles.button, styles.leftButton]}
            onClick={handleClickCreate}
          >
            実行
          </button>
          <button css={styles.button} onClick={handleClickDelete}>
            削除
          </button>
        </div>
      </div>
    </header>
  );
};
