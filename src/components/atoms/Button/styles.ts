import { css } from "@emotion/core";
import config from "@config";

export default {
  base: css({
    padding: "5px 32px",
    borderRadius: "8%",
    outline: "none",
    cursor: "pointer",
    ":hover": {
      opacity: 0.8
    }
  }),
  nomal: css({
    backgroundColor: config.colors.white,
    color: config.colors.red,
    border: "none"
  }),
  inverted: css({
    backgroundColor: config.colors.red,
    color: config.colors.white,
    border: `1px solid ${config.colors.white}`
  })
};
