import * as React from "react";

interface IProps {
  width?: number | string;
  height?: number | string;
}

export const Margin: React.SFC<IProps> = ({ width, height }) => {
  return (
    <div
      style={{
        width: width ?? 0,
        height: height ?? 0,
      }}
    />
  );
}
