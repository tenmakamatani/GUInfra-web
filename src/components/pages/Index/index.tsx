import * as React from "react";

import { ModalTypes } from "@modules/ui";

import { styles } from "./styles";
import { Graph } from "./organisms/Graph";
import { CreateResourceItemList } from "./molecules/CreateResourceItemList";
import { AttachResourceItemList } from "./molecules/AttachResourceItemList";

const createResourceItemList = [
  {
    name: "VPC",
    modalType: ModalTypes.VPCForm,
    source: "/aws/VPC.png"
  },
  {
    name: "EC2",
    modalType: ModalTypes.EC2Form,
    source: "/aws/EC2.png"
  },
  {
    name: "Subnet",
    modalType: ModalTypes.SubnetForm,
    source: "/aws/Subnet.png"
  },
  {
    name: "RouteTable",
    modalType: ModalTypes.RouteTableForm,
    source: "/aws/RouteTable.png"
  },
  {
    name: "SecurityGroup",
    modalType: ModalTypes.SecurityGroupForm,
    source: "/aws/SecurityGroup.png"
  },
  {
    name: "InternetGateway",
    modalType: ModalTypes.InternetGatewayForm,
    source: "/aws/InternetGateway.png"
  }
];

const IndexPage = () => {
  return (
    <div css={styles.indexPage.wrapper}>
      <CreateResourceItemList resources={createResourceItemList} />
      <Graph />
      <AttachResourceItemList />
    </div>
  );
};

export { IndexPage };
