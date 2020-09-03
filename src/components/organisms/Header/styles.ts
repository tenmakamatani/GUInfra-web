import { css } from "@emotion/core";
import config from "@config";

export const styles = {
  wrapper: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "70px",
    padding: "0 20px",
    backgroundColor: config.colors.red
  }),
  title: css({
    color: "white",
    fontSize: config.fontSize.huge
  }),
  titleWrapper: css({
    width: "10%"
  }),
  buttonsWrapper: css({
    textAlign: "end",
    width: "90%"
  }),
  leftButton: css({
    marginRight: "20px"
  }),
  button: css({
    border: `2px solid ${config.colors.white}`,
    padding: "5px 30px",
    color: config.colors.white,
    backgroundColor: config.colors.red,
    cursor: "pointer",
    outline: "none",
    ":hover": {
      opacity: 0.6
    }
  })
};
