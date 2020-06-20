import * as React from "react";

import { styles } from "../styles";

export interface IResource {
  name: string;
  source: string;
}

export const CreateResourceItem: React.SFC<IResource> = props => (
  <div css={styles.createResourceItem.wrapper}>
    <img src={props.source} alt="Resource" />
    <p>{props.name}</p>
  </div>
);
