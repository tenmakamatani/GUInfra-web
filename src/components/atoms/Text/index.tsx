import * as React from "react";
import styles from "./styles";

interface IProps {
  content?: string;
  error?: boolean;
}

export const Text: React.SFC<IProps> = ({ error, content }) => {
  return error ? (
    <p css={styles.error}>{content}</p>
  ) : (
    <p style={{ whiteSpace: "pre-line" }}>{content}</p>
  );
};
