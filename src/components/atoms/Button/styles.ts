import { css } from "@emotion/core";
import config from "@config";

export default {
  base: css({
    padding: "5px 32px",
    borderRadius: "8%",
    outline: "none",
    cursor: "pointer",
    fontWeight: "bold"
  }),
  nomal: css({
    backgroundColor: config.colors.white,
    color: config.colors.red,
    border: "none",
    ":hover": {
      transitionDuration: "0.5s",
      backgroundColor: config.colors.grey
    }
  }),
  inverted: css({
    backgroundColor: config.colors.red,
    color: config.colors.white,
    border: `1px solid ${config.colors.white}`,
    ":hover": {
      transitionDuration: "0.5s",
      opacity: 0.8
    }
  })
};
