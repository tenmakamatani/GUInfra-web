import * as React from "react";

import { Text, Select, IOption, Margin } from "@components/atoms";
import styles from "./styles";

type Props = {
  label: string;
  error?: string;
  options: IOption[];
  touched?: boolean;
} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export const SelectField: React.SFC<Props> = props => {
  return (
    <div css={styles.wrapper}>
      <Text bold size="normal" content={props.label} />
      <Margin height={5} />
      <Select {...props} />
      <Margin height={5} />
      <Text size="small" error content={props.touched ? props.error : ""} />
    </div>
  );
};
