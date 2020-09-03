import { IAWSState } from "./index";
import {
  EC2Id,
  VPCId,
  SubnetId,
  RouteTableId,
  SecurityGroupId,
  InternetGatewayId
} from "@libs/domain/models/aws";

export const canRemoveEc2 = (state: IAWSState, ec2Id: EC2Id): boolean => {
  return true;
};
export const canRemoveVpc = (state: IAWSState, vpcId: VPCId): boolean => {
  const subnet = state.subnetList.find(s =>
    s.resource.properties.vpcId.isEqualTo(vpcId)
  );
  const routeTable = state.routeTableList.find(r =>
    r.resource.properties.vpcId.isEqualTo(vpcId)
  );
  const securityGroup = state.securityGroupList.find(s =>
    s.resource.properties.vpcId.isEqualTo(vpcId)
  );
  const internetGateway = state.internetGatewayList.find(i =>
    i.resource.properties.vpcId.isEqualTo(vpcId)
  );
  return !subnet && !routeTable && !securityGroup && !internetGateway;
};
export const canRemoveSubnet = (
  state: IAWSState,
  subnetId: SubnetId
): boolean => {
  const ec2 = state.ec2List.find(e =>
    e.resource.properties.subnetId.isEqualTo(subnetId)
  );
  const routeTable = state.routeTableList.find(r =>
    r.resource.properties.subnetId.isEqualTo(subnetId)
  );
  return !ec2 && !routeTable;
};
export const canRemoveRouteTable = (
  state: IAWSState,
  routeTableId: RouteTableId
): boolean => {
  return true;
};
export const canRemoveSecurityGroup = (
  state: IAWSState,
  securityGroupId: SecurityGroupId
): boolean => {
  const ec2 = state.ec2List.find(e =>
    e.resource.properties.securityGroupIds.find(id =>
      id.isEqualTo(securityGroupId)
    )
  );
  return !ec2;
};
export const canRemoveInternetGateway = (
  state: IAWSState,
  internetGatewayId: InternetGatewayId
): boolean => {
  return true;
};
