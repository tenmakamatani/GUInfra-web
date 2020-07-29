import * as React from "react";
import { useSelector } from "react-redux";
import { awsSelector } from "@modules/aws";
import { SecurityGroupItem } from "../resources/aws/SecurityGroupItem";
import { styles } from "../styles";

export const AttachResourceItemList = () => {
  const allResources = useSelector(awsSelector.selectAll);
  return (
    <div css={styles.attachResourceItemList.wrapper}>
      <div>
        <h3>Security Group</h3>
        {allResources.securityGroupList.map(s => (
          <SecurityGroupItem securityGroup={s} />
        ))}
      </div>
    </div>
  );
};
