import * as React from "react";
import { useSelector } from "react-redux";

import { awsSelector } from "@modules/aws";

import { VPCItem } from "../resources/VPCItem";

import { styles } from "../styles";

export const Graph: React.SFC = () => {
  const awsResources = useSelector(awsSelector.selectAll);
  console.log(awsResources);
  return (
    <div css={styles.graph.wrapper}>
      {awsResources.vpcList.map(vpc => (
        <VPCItem vpc={vpc} />
      ))}
    </div>
  );
};
