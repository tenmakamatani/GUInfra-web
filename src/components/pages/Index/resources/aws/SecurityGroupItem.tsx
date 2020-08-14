import * as React from "react";
import { useDispatch } from "react-redux";
import { ISecurityGroupView } from "@modules/aws/resources";
import { uiActions, ModalTypes } from "@modules/ui";
import { styles } from "../../styles";

interface IProps {
  securityGroup: ISecurityGroupView;
}

export const SecurityGroupItem: React.SFC<IProps> = ({ securityGroup }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(
          uiActions.appearModal({
            type: ModalTypes.SecurityGroupForm,
            resource: securityGroup.resource
          })
        );
      }}
      css={styles.securityGroupItem.wrapper}
    >
      <p>{securityGroup.resource.properties.name}</p>
      <p>{securityGroup.resource.properties.description}</p>
      {securityGroup.resource.properties.permissions.ingress.map(i => (
        <p>{`${i.fromPort} => ${i.toPort}`}</p>
      ))}
      {securityGroup.resource.properties.permissions.egress.map(e => (
        <p>{`${e.fromPort} => ${e.toPort}`}</p>
      ))}
    </div>
  );
};
