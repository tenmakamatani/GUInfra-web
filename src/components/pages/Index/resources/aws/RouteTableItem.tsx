import * as React from "react";
import { IRouteTableView } from "@modules/aws/resources";
import { ModalTypes } from "@modules/ui";
import { AttachResourceItem } from "../../atoms/AttachResourceItem";

interface IProps {
  routeTable: IRouteTableView;
}

export const RouteTableItem: React.SFC<IProps> = ({ routeTable }) => {
  return (
    <AttachResourceItem
      title="RouteTable"
      description={
        routeTable.resource.properties.gatewayId?.value +
        "\n" +
        routeTable.resource.properties.vpcId.value
      }
      modalType={ModalTypes.RouteTableForm}
      resourceView={routeTable}
    />
  );
};
