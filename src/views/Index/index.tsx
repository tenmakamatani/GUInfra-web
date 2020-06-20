import * as React from "react";

import EC2 from "../../../public/aws/EC2.png";

import { styles } from "./styles";
import { CreateResourceItemList } from "./molecules/CreateResourceItemList";

const createResourceItemList = [
  {
    name: "EC2",
    source: EC2
  },
  {
    name: "VPC",
    source: EC2
  }
];

const IndexPage = () => {
  return (
    <div css={styles.indexPage.wrapper}>
      <CreateResourceItemList resources={createResourceItemList} />
      <div></div>
    </div>
  );
};

export { IndexPage };
