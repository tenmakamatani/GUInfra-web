import * as React from "react";
import { css } from "@emotion/core";

export interface IResource {
  name: string;
  source: string;
}

const styles = {
  wrapper: css({
    textAlign: "center"
  })
};

export const CreateResourceItem: React.SFC<IResource> = props => (
  <div css={styles.wrapper}>
    <img src={props.source} alt="Resource" />
    <p>{props.name}</p>
  </div>
);
