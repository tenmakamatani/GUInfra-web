import { css } from "@emotion/core";

export const styles = {
  // index.tsx
  indexPage: {
    wrapper: css({
      display: "flex",
      height: "100%"
    })
  },
  // atoms
  createResourceItem: {
    wrapper: css({
      textAlign: "center",
      width: 100
    }),
    img: css({
      width: "100%",
      height: "100%"
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
      width: "20%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      marginTop: "10px"
    })
  },
  attachResourceItemList: {
    wrapper: css({
      width: "20%"
    })
  },
  // organisms
  graph: {
    wrapper: css({
      width: "60%",
      height: "calc(100%-70px)",
      border: "1px solid rgba(0,0,0,0.2)"
    })
  },
  // resources
  securityGroupItem: {
    wrapper: css({
      cursor: "pointer",
      "&:hover": {
        opacity: 0.5
      }
    })
  }
};
