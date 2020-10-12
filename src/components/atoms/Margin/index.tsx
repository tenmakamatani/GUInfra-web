import * as React from "react";

interface IProps {
  width?: number | string;
  height?: number | string;
}

export const Margin: React.SFC<IProps> = ({ width, height }) => {
  const paddingVertical = height ?? 0;
  const paddingHorizontal = width ?? 0;
  return (
    <div
      style={{
        paddingTop: paddingVertical,
        paddingBottom: paddingVertical,
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal
      }}
    />
  );
}
