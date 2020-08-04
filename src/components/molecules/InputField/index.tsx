import * as React from "react";
import { Input, ErrorMessage } from "@components/atoms";

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
      <p>{props.label}</p>
      <Input {...props} />
      <ErrorMessage content={props.error} />
    </div>
  );
};
