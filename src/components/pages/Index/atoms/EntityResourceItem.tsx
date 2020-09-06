import * as React from "react";
import { Rnd, RndResizeCallback, RndDragCallback } from "react-rnd";

import { IWithUIResourceView } from "@modules/aws/resources";
import styles from "../styles";

interface IProps {
  tip: string;
  source: string;
  resource: IWithUIResourceView;
  onDragStop: RndDragCallback;
  onResizeStop: RndResizeCallback;
}

export const EntityResourceItem: React.SFC<IProps> = props => {
  const resource = props.resource;
  return (
    <Rnd
      default={{
        x: resource.x,
        y: resource.y!,
        width: resource.width,
        height: resource.height
      }}
      style={{
        cursor: "pointer" // なぜかcssでやると効かない
      }}
      css={styles.entityResourceItem.rnd}
      lockAspectRatio
      bounds="parent"
      onResizeStop={props.onResizeStop}
      onDragStop={props.onDragStop}
    >
      <div data-tip={props.tip} css={styles.entityResourceItem.wrapper}>
        <img
          style={{ pointerEvents: "none" }}
          css={styles.entityResourceItem.img}
          src={props.source}
          alt="リソース"
        />
      </div>
    </Rnd>
  );
};
