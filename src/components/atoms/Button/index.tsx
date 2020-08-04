import * as React from "react";

interface IProps {
  value: string;
  onClick: () => void;
}

export const Button: React.SFC<IProps> = props => {
  return <button {...props} />;
};
