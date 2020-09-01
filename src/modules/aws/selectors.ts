import { IStore } from "../store";
import { IAWSState } from "./index";
import {
  VPCId,
  VPC,
  SubnetId,
  Subnet,
  InternetGateway,
  InternetGatewayId
} from "@libs/domain/models/aws";

const selectAll = (store: IStore): IAWSState => {
  return store.aws;
};
const getVpc = (id: VPCId) => (store: IStore): VPC => {
  return store.aws.vpcList.find(vpc => vpc.resource.id.isEqualTo(id))!.resource;
};
const getSubnet = (id: SubnetId) => (store: IStore): Subnet => {
  return store.aws.subnetList.find(subnet => subnet.resource.id.isEqualTo(id))!
    .resource;
};
const getInternetGateway = (id: InternetGatewayId) => (
  store: IStore
): InternetGateway => {
  return store.aws.internetGatewayList.find(internetGateway =>
    internetGateway.resource.id.isEqualTo(id)
  )!.resource;
};

export const selectors = {
  selectAll,
  getVpc,
  getSubnet,
  getInternetGateway
};
