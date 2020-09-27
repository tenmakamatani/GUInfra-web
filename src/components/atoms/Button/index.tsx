import * as React from "react";
import styles from "./styles";

interface IProps {
  type?: "submit";
  value: string;
  inverted?: boolean;
  onClick: () => void;
}

export const Button: React.SFC<IProps> = props => {
  if (props.inverted) {
    return (
      <button css={[styles.base, styles.inverted]} {...props}>
        {props.value}
      </button>
    );
  } else {
    return (
      <button css={[styles.base, styles.nomal]} {...props}>
        {props.value}
      </button>
    );
  }
};
