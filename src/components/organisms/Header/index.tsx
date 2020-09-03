import * as React from "react";
import { useDispatch } from "react-redux";
import { ModalTypes, uiActions } from "@modules/ui";

import { styles } from "./styles";
import { toast } from "@libs/application/utils";
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
  const handleClickDelete = async () => {
    dispatch(
      uiActions.appearModal({
        type: ModalTypes.LogDisplay
      })
    );
    await DI.awsResourceUseCase.deleteAll().catch(e => {
      console.log("error!");
      console.log(e);
    });
    dispatch(uiActions.removeModal());
    toast.success("リソースの削除に成功しました");
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
