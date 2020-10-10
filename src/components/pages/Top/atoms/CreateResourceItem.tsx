import * as React from "react";
import { useDispatch } from "react-redux";

import { ModalTypes, uiActions } from "@modules/ui";
import { Margin, Text } from "@components/atoms";

import styles from "../styles";

export interface IResource {
  name: string;
  modalType: ModalTypes;
  source: string;
}

export const CreateResourceItem: React.SFC<IResource> = props => {
  const dispatch = useDispatch();
  return (
    <div css={styles.createResourceItem.wrapper}>
      <Margin height={30} />
      <img
        css={styles.createResourceItem.img}
        src={props.source}
        alt="Resource"
        onClick={() => {
          dispatch(
            uiActions.appearModal({
              type: props.modalType
            })
          );
        }}
      />
      <Margin height={5} />
      <Text size="small" content={props.name} />
    </div>
  );
};
