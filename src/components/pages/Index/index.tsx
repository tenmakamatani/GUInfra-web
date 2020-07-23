import * as React from "react";

import { ModalTypes } from "@modules/ui";

import { styles } from "./styles";
import { Graph } from "./organisms/Graph";
import { CreateResourceItemList } from "./molecules/CreateResourceItemList";

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
  }
];

const IndexPage = () => {
  return (
    <div css={styles.indexPage.wrapper}>
      <CreateResourceItemList resources={createResourceItemList} />
      <Graph />
    </div>
  );
};

export { IndexPage };
