import * as React from "react";
import { useDispatch } from "react-redux";
import config from "@config";
import { ModalTypes, uiActions } from "@modules/ui";
import styles from "./styles";
import { Graph } from "./organisms/Graph";
import { CreateResourceItemList } from "./molecules/CreateResourceItemList";
import { AttachResourceItemList } from "./molecules/AttachResourceItemList";

const createResourceItemList = [
  {
    name: "EC2",
    modalType: ModalTypes.EC2Form,
    source: config.images.ec2
  },
  {
    name: "VPC",
    modalType: ModalTypes.VPCForm,
    source: config.images.vpc
  },
  {
    name: "Subnet",
    modalType: ModalTypes.SubnetForm,
    source: config.images.subnet
  },
  {
    name: "RouteTable",
    modalType: ModalTypes.RouteTableForm,
    source: config.images.routeTable
  },
  {
    name: "SecurityGroup",
    modalType: ModalTypes.SecurityGroupForm,
    source: config.images.securityGroup
  },
  {
    name: "InternetGateway",
    modalType: ModalTypes.InternetGatewayForm,
    source: config.images.internetGateway
  }
];

const IndexPage = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      uiActions.appearModal({
        type: ModalTypes.FirstDisplay
      })
    );
  }, []);
  return (
    <div css={styles.indexPage.wrapper}>
      <CreateResourceItemList resources={createResourceItemList} />
      <Graph />
      <AttachResourceItemList />
    </div>
  );
};

export { IndexPage };
