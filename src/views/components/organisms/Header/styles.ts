import { css } from "@emotion/core";

export const styles = {
  wrapper: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "70px",
    padding: "0 20px",
    backgroundColor: "tomato"
  }),
  title: css({
    color: "white",
    fontSize: 25
  }),
  titleWrapper: css({
    width: "10%"
  }),
  buttonsWrapper: css({
    textAlign: "end",
    width: "90%"
  }),
  leftButton: css({
    marginRight: "10px"
  }),
  button: css({
    border: "none",
    padding: "5px 20px",
    borderRadius: 5,
    color: "grey",
    cursor: "pointer",
    outline: "none",
    ":hover": {
      opacity: 0.9
    }
  })
};
