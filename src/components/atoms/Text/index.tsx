import * as React from "react";
import styles from "./styles";
import config from "@config";

interface IProps {
  content?: string;
  error?: boolean;
  size?: FontSize;
}

type FontSize = keyof typeof config.fontSize;

export const Text: React.SFC<IProps> = ({ error, content, size }) => {
  const fontSize = config.fontSize[size ? size : "normal"];
  return error ? (
    <p style={{ fontSize: fontSize }} css={styles.error}>
      {content}
    </p>
  ) : (
    <p style={{ whiteSpace: "pre-line", fontSize: fontSize }}>{content}</p>
  );
};
