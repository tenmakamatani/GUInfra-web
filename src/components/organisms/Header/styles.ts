import { css } from "@emotion/core";
import config from "@config";

export default {
  wrapper: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "70px",
    padding: "0 20px",
    backgroundColor: config.colors.red
  }),
  title: css({
    color: config.colors.white,
    fontSize: config.fontSize.huge
  }),
  titleWrapper: css({
    width: "10%"
  }),
  buttonsWrapper: css({
    display: "flex",
    justifyContent: "flex-end",
    width: "90%"
  })
};
