import * as React from "react";
import { useSelector } from "react-redux";

import { awsSelector } from "@modules/aws";

import { EC2Item } from "../resources/EC2Item";
import { VPCItem } from "../resources/VPCItem";

import { styles } from "../styles";

export const Graph: React.SFC = () => {
  const awsResources = useSelector(awsSelector.selectAll);
  console.log(awsResources);
  return (
    <div css={styles.graph.wrapper}>
      {awsResources.ec2List.map(ec2 => (
        <EC2Item ec2={ec2} />
      ))}
      {awsResources.vpcList.map(vpc => (
        <VPCItem vpc={vpc} />
      ))}
    </div>
  );
};
