import ReactToolTip, { TooltipProps } from "react-tooltip";

type Props = TooltipProps;

export const ToolTip: React.SFC<Props> = props => {
  return <ReactToolTip {...props} />;
};
