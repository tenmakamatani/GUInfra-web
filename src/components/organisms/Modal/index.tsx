import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";

import { uiActions, uiSelectors, ModalTypes } from "@modules/ui";

import { MetadataForm } from "./contents/MetadataForm";
import { EC2Form } from "./contents/EC2Form";
import { VPCForm } from "./contents/VPCForm";
import { SecurityGroupForm } from "./contents/SecurityGroupForm";
import { EC2, VPC, SecurityGroup } from "@libs/domain/models/aws";

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
      ) : modal.type === ModalTypes.EC2Form ? (
        <EC2Form ec2={modal.resource as EC2} />
      ) : modal.type === ModalTypes.SecurityGroupForm ? (
        <SecurityGroupForm securityGroup={modal.resource as SecurityGroup} />
      ) : modal.type === ModalTypes.MetadataForm ? (
        <MetadataForm />
      ) : (
        <div />
      )}
    </ReactModal>
  );
};
