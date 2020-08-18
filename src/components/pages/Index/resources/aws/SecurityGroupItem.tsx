import * as React from "react";
import { ISecurityGroupView } from "@modules/aws/resources";
import { ModalTypes } from "@modules/ui";
import { AttachResourceItem } from "../../atoms/AttachResourceItem";

interface IProps {
  securityGroup: ISecurityGroupView;
}

export const SecurityGroupItem: React.SFC<IProps> = ({ securityGroup }) => {
  const getDescription = (): string => {
    let description = "";
    description += `${securityGroup.resource.properties.description}`;
    description += `\n[ingress]\n`;
    securityGroup.resource.properties.permissions.ingress.map(i => {
      description += `${i.type},`;
    });
    description += `\n[egress]\n`;
    securityGroup.resource.properties.permissions.egress.map(e => {
      description += `${e.type},`;
    });
    return description;
  };

  return (
    <AttachResourceItem
      title={securityGroup.resource.properties.name}
      description={getDescription()}
      modalType={ModalTypes.SecurityGroupForm}
      resourceView={securityGroup}
    />
  );
};
