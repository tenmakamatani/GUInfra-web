import * as React from "react";
import { useDispatch } from "react-redux";

import { AllResource } from "@libs/domain/models";
import { ModalTypes, uiActions } from "@modules/ui";
import { Text } from "@components/atoms/Text";

interface IProps {
  title: string;
  description: string;
  resource: AllResource;
  modalType: ModalTypes;
}

export const AttachResourceItem: React.SFC<IProps> = props => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(
          uiActions.appearModal({
            type: props.modalType,
            resource: props.resource
          })
        );
      }}
    >
      <Text content={props.title} />
      <Text content={props.description} />
    </div>
  );
};
