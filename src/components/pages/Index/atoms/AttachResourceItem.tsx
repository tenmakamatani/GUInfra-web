import * as React from "react";
import { useDispatch } from "react-redux";

import { ModalTypes, uiActions } from "@modules/ui";
import { IWithoutUIResourceView } from "@modules/aws/resources";
import { Text } from "@components/atoms/Text";
import { styles } from "../styles";

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
      <Text content={props.title} />
      <Text content={props.description} />
    </div>
  );
};
