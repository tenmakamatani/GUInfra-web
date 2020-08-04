import * as React from "react";

interface IProps {
  type?: "submit";
  value: string;
  onClick: () => void;
}

export const Button: React.SFC<IProps> = props => {
  return <button {...props}>{props.value}</button>;
};
