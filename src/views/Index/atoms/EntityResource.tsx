import * as React from "react";
import { Rnd, RndResizeCallback, RndDragCallback } from "react-rnd";

import { IResourceView } from "@modules/aws/resources";

interface IProps {
  source: string;
  resource: IResourceView;
  onDragStop: RndDragCallback;
  onResizeStop: RndResizeCallback;
}

export const EntityResourceItem: React.SFC<IProps> = props => {
  const resource = props.resource;
  return (
    <Rnd
      default={{
        x: resource.x,
        y: resource.y,
        width: resource.width,
        height: resource.height
      }}
      lockAspectRatio
      bounds="parent"
      onResizeStop={props.onResizeStop}
      onDragStop={props.onDragStop}
    >
      <img
        style={{
          width: "100%",
          height: "100%"
        }}
        src={props.source}
        alt="リソース"
      />
    </Rnd>
  );
};
