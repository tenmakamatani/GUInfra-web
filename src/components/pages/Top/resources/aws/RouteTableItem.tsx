import * as React from "react";
import { useSelector } from "react-redux";
import { awsSelector } from "@modules/aws";
import { IRouteTableView } from "@modules/aws/resources";
import { ModalTypes } from "@modules/ui";
import { AttachResourceItem } from "../../atoms/AttachResourceItem";

interface IProps {
  routeTable: IRouteTableView;
}

export const RouteTableItem: React.SFC<IProps> = ({ routeTable }) => {
  const vpc = useSelector(
    awsSelector.getVpc(routeTable.resource.properties.vpcId)
  );
  const subnet = useSelector(
    awsSelector.getSubnet(routeTable.resource.properties.subnetId)
  );
  const gateway = useSelector(
    awsSelector.getInternetGateway(routeTable.resource.properties.gatewayId!)
  );
  return (
    <AttachResourceItem
      title=""
      description={
        vpc.properties.name +
        "\n" +
        subnet.properties.name +
        "\n" +
        gateway.properties.name
      }
      modalType={ModalTypes.RouteTableForm}
      resourceView={routeTable}
    />
  );
};
