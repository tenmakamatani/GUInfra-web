import * as React from "react";
import styles from "./styles";

interface IProps {
  content?: string;
}

export const ErrorMessage: React.SFC<IProps> = ({ content }) => {
  return <p css={styles.content}>{content}</p>;
};
