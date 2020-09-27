import * as React from "react";
import { useDispatch } from "react-redux";
import { ModalTypes, uiActions } from "@modules/ui";

import styles from "./styles";
import { toast } from "@libs/application/utils";
import { DI } from "@libs/application/DI";
import { Margin, Button } from "@components/atoms";

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
    if (!DI.isAwsResourceUseCaseBound) {
      toast.error("まずリソースを作成してください");
      return;
    }
    dispatch(
      uiActions.appearModal({
        type: ModalTypes.LogDisplay
      })
    );
    await DI.awsResourceUseCase.deleteAll().catch(e => {
      toast.error("リソースの削除に失敗しました");
      toast.error(e);
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
          <Button value="実行" onClick={handleClickCreate} />
          <Margin width={10} />
          <Button value="削除" inverted onClick={handleClickDelete} />
        </div>
      </div>
    </header>
  );
};
