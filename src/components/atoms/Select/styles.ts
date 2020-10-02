import { css } from "@emotion/core";
import config from "@config";

export default {
  multipleSelect: css({
    width: "100%",
    backgroundColor: config.colors.grey,
    paddingLeft: "5px",
    border: "none",
    outline: "none",
    cursor: "pointer"
  }),
  multipleOption: css({
    width: "100%"
  }),
  select: css({
    width: "100%",
    height: "36px",
    backgroundColor: config.colors.grey,
    paddingLeft: "5px",
    border: "none",
    outline: "none",
    cursor: "pointer"
  }),
  option: css({
    width: "100%",
    height: "36px",
    paddingLeft: "5px"
  })
};
