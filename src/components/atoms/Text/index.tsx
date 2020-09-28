import * as React from "react";
import styles from "./styles";
import config from "@config";

interface IProps {
  content?: string;
  error?: boolean;
  bold?: boolean;
  size?: FontSize;
}

type FontSize = keyof typeof config.fontSize;

export const Text: React.SFC<IProps> = ({ bold, error, content, size }) => {
  const fontWeight = bold ? "bold" : "normal";
  const fontSize = config.fontSize[size ? size : "normal"];
  return error ? (
    <p
      style={{ fontSize: fontSize, fontWeight: fontWeight }}
      css={styles.error}
    >
      {content}
    </p>
  ) : (
    <p
      style={{
        whiteSpace: "pre-line",
        fontSize: fontSize,
        fontWeight: fontWeight
      }}
    >
      {content}
    </p>
  );
};
