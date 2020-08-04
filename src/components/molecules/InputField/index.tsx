import * as React from "react";
import { Input } from "@components/atoms/Input";
import { ErrorMessage } from "@components/atoms/ErrorMessage";

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
