import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";

import { uiActions, uiSelectors, ModalTypes } from "@modules/ui";

import { MetadataForm } from "./contents/MetadataForm";
import { VPCForm } from "./contents/VPCForm";
import { VPC } from "@libs/domain/models/aws";

ReactModal.setAppElement("#root");
export const Modal: React.SFC = () => {
  const dispatch = useDispatch();
  const modal = useSelector(uiSelectors.modal);
  return (
    <ReactModal
      isOpen={modal.isOpen}
      style={{
        content: {
          width: "50%",
          height: "50%",
          margin: "auto"
        },
        overlay: {
          backgroundColor: "rgba(255, 255, 255, 0.75)"
        }
      }}
      onRequestClose={() => {
        dispatch(uiActions.removeModal());
      }}
    >
      {modal.type === ModalTypes.VPCForm ? (
        <VPCForm vpc={modal.resource as VPC} />
      ) : modal.type === ModalTypes.MetadataForm ? (
        <MetadataForm />
      ) : (
        <div />
      )}
    </ReactModal>
  );
};
