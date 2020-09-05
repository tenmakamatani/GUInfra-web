import * as React from "react";
import { Rnd, RndResizeCallback, RndDragCallback } from "react-rnd";

import { IWithUIResourceView } from "@modules/aws/resources";

import { styles } from "../styles";

interface IProps {
  name?: string;
  resource: IWithUIResourceView;
  onDragStop: RndDragCallback;
  onResizeStop: RndResizeCallback;
}

export const ScopeResourceItem: React.SFC<IProps> = props => {
  const resource = props.resource;
  return (
    <Rnd
      default={{
        x: resource.x,
        y: resource.y,
        width: resource.width,
        height: resource.height
      }}
      bounds="parent"
      style={{
        cursor: "pointer"
      }}
      css={styles.scopeResourceItem.rnd}
      onResizeStop={props.onResizeStop}
      onDragStop={props.onDragStop}
    >
      {props.name}
    </Rnd>
  );
};
