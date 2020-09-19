import * as React from "react";

interface IProps {
  width?: number;
  height?: number;
}

export const Margin: React.SFC<IProps> = ({ width, height }) => {
  const marginVertical = height ?? 0;
  const marginHorizontal = width ?? 0;
  return (
    <div
      style={{
        marginTop: marginVertical,
        marginBottom: marginVertical,
        marginLeft: marginHorizontal,
        marginRight: marginHorizontal
      }}
    />
  );
}
