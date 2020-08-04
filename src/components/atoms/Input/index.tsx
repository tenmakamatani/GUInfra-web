import * as React from "react";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input: React.SFC<Props> = (props) => {
  return (
    <input {...props} />
  )
}
