import * as React from "react";
import { useDispatch } from "react-redux";
import { IRouteTableView } from "@modules/aws/resources";
import { uiActions, ModalTypes } from "@modules/ui";

interface IProps {
  routeTable: IRouteTableView;
}

export const RouteTableItem: React.SFC<IProps> = ({ routeTable }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(
          uiActions.appearModal({
            type: ModalTypes.RouteTableForm,
            resource: routeTable.resource
          })
        );
      }}
    >
      <p>{routeTable.resource.properties.vpcId.value}</p>
      <p>{routeTable.resource.properties.gatewayId?.value}</p>
    </div>
  );
};
