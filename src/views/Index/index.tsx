import * as React from "react";

import VPC from "../../../public/aws/VPC.png";

import { ModalTypes } from "@modules/ui";

import { styles } from "./styles";
import { Graph } from "./organisms/Graph";
import { CreateResourceItemList } from "./molecules/CreateResourceItemList";

const createResourceItemList = [
  {
    name: "VPC",
    modalType: ModalTypes.VPCForm,
    source: VPC
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
