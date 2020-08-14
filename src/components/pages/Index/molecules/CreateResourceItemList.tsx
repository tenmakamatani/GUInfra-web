import * as React from "react";

import { styles } from "../styles";
import { CreateResourceItem, IResource } from "../atoms/CreateResourceItem";

interface IProps {
  resources: IResource[];
}

export const CreateResourceItemList: React.SFC<IProps> = props => (
  <div css={styles.createResourceItemList.wrapper}>
    {props.resources.map(resource => (
      <CreateResourceItem
        key={resource.source}
        name={resource.name}
        modalType={resource.modalType}
        source={resource.source}
      />
    ))}
  </div>
);
