import * as React from "react";

import { Text, Select } from "@components/atoms";

type Props = {
  label: string;
  error?: string;
} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export const SelectField: React.SFC<Props> = props => {
  return (
    <div>
      <Text content={props.label} />
      <Select {...props} />
      <Text error content={props.error} />
    </div>
  );
};
