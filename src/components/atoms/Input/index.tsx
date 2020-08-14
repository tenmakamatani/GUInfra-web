import * as React from "react";
import styles from "./styles";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input: React.SFC<Props> = (props) => {
  return (
    <input
      css={styles.input}
      {...props}
    />
  )
}
