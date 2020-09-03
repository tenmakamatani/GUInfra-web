import * as React from "react";
import { useDispatch } from "react-redux";

import { ModalTypes, uiActions } from "@modules/ui";
import { Text } from "@components/atoms";

import { styles } from "../styles";

export interface IResource {
  name: string;
  modalType: ModalTypes;
  source: string;
}

export const CreateResourceItem: React.SFC<IResource> = props => {
  const dispatch = useDispatch();
  return (
    <div css={styles.createResourceItem.wrapper}>
      <img
        css={styles.createResourceItem.wrapper}
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
      <Text size="small" content={props.name} />
    </div>
  );
};
