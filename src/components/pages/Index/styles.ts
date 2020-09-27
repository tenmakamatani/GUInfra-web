import { css } from "@emotion/core";

export default {
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
        opacity: 0.5,
        boxShadow: "0px 0px 10px 2px lightgrey"
      }
    })
  },
  createResourceItem: {
    wrapper: css({
      textAlign: "center",
      width: 100,
      cursor: "pointer",
      "&:hover": {
        opacity: 0.8
      }
    }),
    img: css({
      width: "100%",
      height: "auto",
      borderRadius: "8%"
    })
  },
  entityResourceItem: {
    rnd: css({
      width: "100%",
      height: "100%"
    }),
    wrapper: {
      width: "100%",
      height: "100%",
      cursor: "pointer",
      ":hover": {
        transform: "scale(1.02)",
        transitionDuration: "0.3s",
        boxShadow: "0px 0px 10px 2px lightgrey"
      }
    },
    img: css({
      width: "100%",
      height: "100%"
    })
  },
  scopeResourceItem: {
    rnd: css({
      width: "100%",
      height: "100%"
    }),
    wrapper: css({
      border: "solid 1px black",
      width: "100%",
      height: "100%",
      cursor: "pointer",
      ":hover": {
        transform: "scale(1.02)",
        transitionDuration: "0.3s",
        boxShadow: "0px 0px 10px 2px lightgrey"
      }
    })
  },
  // molecules
  createResourceItemList: {
    wrapper: css({
      width: "20%",
      height: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignContent: "flex-start"
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
      backgroundColor: "#F7F7F7",
      width: "64%",
      height: "calc(100%-70px)"
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
