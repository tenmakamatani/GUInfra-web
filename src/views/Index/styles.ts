import { css } from "@emotion/core";

export const styles = {
  // index.tsx
  indexPage: {
    wrapper: css({
      display: "flex"
    })
  },
  // atoms
  createResourceItem: {
    wrapper: css({
      textAlign: "center"
    })
  },
  scopeResourceItem: {
    rnd: css({
      border: "solid 1px black"
    })
  },
  // molecules
  createResourceItemList: {
    wrapper: css({
      width: "20%"
    })
  },
  // organisms
  graph: {
    wrapper: css({
      width: "80%"
    })
  }
};
