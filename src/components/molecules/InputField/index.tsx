import * as React from "react";
import { Input, Text } from "@components/atoms";

type Props = {
  label: string;
  error?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputField: React.SFC<Props> = props => {
  return (
    <div>
      <Text content={props.label} />
      <Input {...props} />
      <Text error content={props.error} />
    </div>
  );
};
