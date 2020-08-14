import * as React from "react";
import styles from "./styles";

type Props = {
  options: IOption[];
} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export interface IOption {
  label: string;
  value: string;
}

export const Select: React.SFC<Props> = props => {
  return (
    <select css={styles.select} {...props}>
      {props.options.map(option => (
        <option label={option.label} value={option.value} />
      ))}
    </select>
  );
};
