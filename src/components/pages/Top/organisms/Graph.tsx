import * as React from "react";
import { useSelector } from "react-redux";

import { awsSelector } from "@modules/aws";

import { EC2Item } from "../resources/aws/EC2Item";
import { VPCItem } from "../resources/aws/VPCItem";
import { SubnetItem } from "../resources/aws/SubnetItem";
import { InternetGatewayItem } from "../resources/aws/InternetGatewayItem";

import styles from "../styles";

export const Graph: React.SFC = () => {
  const awsResources = useSelector(awsSelector.selectAll);
  return (
    <div css={styles.graph.wrapper}>
      {awsResources.vpcList.map(vpc => (
        <VPCItem key={vpc.resource.id.value} vpc={vpc} />
      ))}
      {awsResources.subnetList.map(subnet => (
        <SubnetItem key={subnet.resource.id.value} subnet={subnet} />
      ))}
      {awsResources.ec2List.map(ec2 => (
        <EC2Item key={ec2.resource.id.value} ec2={ec2} />
      ))}
      {awsResources.internetGatewayList.map(internetGateway => (
        <InternetGatewayItem
          key={internetGateway.resource.id.value}
          internetGateway={internetGateway}
        />
      ))}
    </div>
  );
};
