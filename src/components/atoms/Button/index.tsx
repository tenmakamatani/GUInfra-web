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
      <button
        type={props.type}
        value={props.value}
        onClick={props.onClick}
        css={[styles.base, styles.inverted]}
      >
        {props.value}
      </button>
    );
  } else {
    return (
      <button
        type={props.type}
        value={props.value}
        onClick={props.onClick}
        css={[styles.base, styles.nomal]}
      >
        {props.value}
      </button>
    );
  }
};
