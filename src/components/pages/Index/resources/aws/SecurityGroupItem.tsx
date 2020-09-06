import * as React from "react";
import { ISecurityGroupView } from "@modules/aws/resources";
import { ModalTypes } from "@modules/ui";
import { AttachResourceItem } from "../../atoms/AttachResourceItem";

interface IProps {
  securityGroup: ISecurityGroupView;
}

export const SecurityGroupItem: React.SFC<IProps> = ({ securityGroup }) => {
  return (
    <AttachResourceItem
      title={securityGroup.resource.properties.name}
      description={securityGroup.resource.properties.description}
      modalType={ModalTypes.SecurityGroupForm}
      resourceView={securityGroup}
    />
  );
};
