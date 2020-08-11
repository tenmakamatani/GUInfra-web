import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";

import { uiActions, uiSelectors, ModalTypes } from "@modules/ui";

import { LogDisplay } from "./contents/LogDisplay";
import { MetadataForm } from "./contents/MetadataForm";
import { EC2Form } from "./contents/EC2Form";
import { VPCForm } from "./contents/VPCForm";
import { SubnetForm } from "./contents/SubnetForm";
import { SecurityGroupForm } from "./contents/SecurityGroupForm";
import { InternetGatewayForm } from "./contents/InternetGatewayForm";
import {
  EC2,
  VPC,
  Subnet,
  SecurityGroup,
  InternetGateway
} from "@libs/domain/models/aws";

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
      ) : modal.type === ModalTypes.SubnetForm ? (
        <SubnetForm subnet={modal.resource as Subnet} />
      ) : modal.type === ModalTypes.SecurityGroupForm ? (
        <SecurityGroupForm securityGroup={modal.resource as SecurityGroup} />
      ) : modal.type === ModalTypes.InternetGatewayForm ? (
        <InternetGatewayForm
          internetGateway={modal.resource as InternetGateway}
        />
      ) : modal.type === ModalTypes.MetadataForm ? (
        <MetadataForm />
      ) : modal.type === ModalTypes.LogDisplay ? (
        <LogDisplay />
      ) : (
        <div />
      )}
    </ReactModal>
  );
};
