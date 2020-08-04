import * as React from "react";
import styles from "./styles";

type Props = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export const Select: React.SFC<Props> = props => {
  return <select css={styles.select} {...props} />;
};
