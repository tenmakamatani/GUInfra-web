import * as React from "react";
import { Input, Text } from "@components/atoms";
import styles from "./styles";

type Props = {
  label: string;
  error?: string;
  touched?: boolean;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputField: React.SFC<Props> = props => {
  return (
    <div css={styles.wrapper}>
      <Text size="normal" content={props.label} />
      <Input css={styles.input} {...props} />
      <Text size="small" error content={props.touched ? props.error : ""} />
    </div>
  );
};
