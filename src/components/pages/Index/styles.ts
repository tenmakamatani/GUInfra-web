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
  attachResourceItem: {
    wrapper: css({
      borderTop: "solid black 1px",
      borderBottom: "solid black 1px",
      ":hover": {
        cursor: "pointer",
        opacity: 0.5
      }
    })
  },
  createResourceItem: {
    wrapper: css({
      textAlign: "center",
      width: 90,
      cursor: "pointer",
      "&:hover": {
        opacity: 0.8
      }
    }),
    img: css({
      width: "100%",
      height: "100%"
    })
  },
  entityResourceItem: {
    rnd: css({
      cursor: "pointer"
    })
  },
  scopeResourceItem: {
    rnd: css({
      border: "solid 1px black",
      cursor: "pointer"
    })
  },
  // molecules
  createResourceItemList: {
    wrapper: css({
      width: "19%",
      height: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      marginTop: "10px"
    })
  },
  attachResourceItemList: {
    wrapper: css({
      width: "19%"
    })
  },
  // organisms
  graph: {
    wrapper: css({
      width: "64%",
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
