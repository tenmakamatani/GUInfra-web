import * as React from "react";
import { useSelector } from "react-redux";
import { awsSelector } from "@modules/aws";
import { RouteTableItem } from "../resources/aws/RouteTableItem";
import { SecurityGroupItem } from "../resources/aws/SecurityGroupItem";
import { styles } from "../styles";

export const AttachResourceItemList = () => {
  const allResources = useSelector(awsSelector.selectAll);
  return (
    <div css={styles.attachResourceItemList.wrapper}>
      <div>
        <h3>SecurityGroup</h3>
        {allResources.securityGroupList.map(s => (
          <SecurityGroupItem securityGroup={s} />
        ))}
        <h3>RouteTable</h3>
        {allResources.routeTableList.map(r => (
          <RouteTableItem routeTable={r} />
        ))}
      </div>
    </div>
  );
};
