import * as React from "react";
import { useDispatch } from "react-redux";

import { ModalTypes, uiActions } from "@modules/ui";
import { IWithoutUIResourceView } from "@modules/aws/resources";
import { Text, Margin } from "@components/atoms";
import styles from "../styles";

interface IProps {
  title: string;
  description: string;
  modalType: ModalTypes;
  resourceView: IWithoutUIResourceView;
}

export const AttachResourceItem: React.SFC<IProps> = props => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(
          uiActions.appearModal({
            type: props.modalType,
            resource: props.resourceView.resource
          })
        );
      }}
      css={styles.attachResourceItem.wrapper}
    >
      <Text size="normal" content={props.title} />
      <Margin height={2} />
      <Text size="small" content={props.description} />
    </div>
  );
};
