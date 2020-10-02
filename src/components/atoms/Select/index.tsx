import * as React from "react";
import styles from "./styles";

type Props = {
  options: IOption[];
  isMultiple?: boolean;
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
    <select
      css={props.multiple ? styles.multipleSelect : styles.select}
      {...props}
    >
      {props.options.map(option => (
        <option
          css={props.multiple ? styles.multipleOption : styles.option}
          label={option.label}
          value={option.value}
        />
      ))}
    </select>
  );
};
