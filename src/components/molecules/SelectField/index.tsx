import * as React from "react";

import { Text, Select, IOption } from "@components/atoms";
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
      <Text content={props.label} />
      <Select css={styles.select} {...props} />
      <Text error content={props.touched ? props.error : ""} />
    </div>
  );
};
