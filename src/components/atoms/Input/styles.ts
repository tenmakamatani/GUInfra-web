import { css } from "@emotion/core";
import config from "@config";

export default {
  input: css({
    padding: "18px 5px",
    backgroundColor: config.colors.grey,
    border: "none",
    outline: "none",
    "::placeholder": {
      color: config.colors.darkgrey
    }
  })
};
