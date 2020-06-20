import * as React from "react";

import { CreateResourceItem, IResource } from "../atoms/CreateResourceItem";

interface IProps {
  resources: IResource[];
}

export const CreateResourceItemList: React.SFC<IProps> = props => (
  <div>
    {props.resources.map(resource => (
      <CreateResourceItem name={resource.name} source={resource.source} />
    ))}
  </div>
);
