import { css } from "@emotion/core";
import config from "@config";

export default {
  // index.tsx
  indexPage: {
    wrapper: css({
      display: "flex",
      height: "calc(100% - 70px)"
    })
  },
  // atoms
  attachResourceItem: {
    wrapper: css({
      padding: "10px 0 10px 5px",
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
    wrapper: (color?: string) => css({
      border: `solid 1px ${color ?? "grey"}`,
      width: "100%",
      height: "100%",
      cursor: "pointer",
      backgroundColor: config.colors.white,
      ":hover": {
        transform: "scale(1.02)",
        transitionDuration: "0.3s",
        boxShadow: `0px 0px 10px 2px ${config.colors.darkgrey}`
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
      padding: "10px",
      width: "20%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }),
    feedbackLink: css({
      textDecoration: "none",
      ":hover": {
        transition: "0.2s",
        opacity: 0.5
      }
    }),
    feedbackLinkWrapper: css({
      textAlign: "end"
    })
  },
  // organisms
  graph: {
    wrapper: css({
      backgroundColor: config.colors.grey,
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
