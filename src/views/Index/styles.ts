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
  // molecules
  createResourceItemList: {
    wrapper: css({
      width: "30%",
      backgroundColor: "green"
    })
  },
  // organisms
  graph: css({
    width: "30%"
  })
};
