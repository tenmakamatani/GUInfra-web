import samples from "@libs/domain/models/aws/samples";
import { IAWSState } from "../index";
import { SampleActions } from "./actions";
import { ActionTypes } from "../types";

export const sampleReducer = (
  state: IAWSState,
  action: SampleActions
): IAWSState => {
  switch (action.type) {
    case ActionTypes.CreateSample:
      return {
        ...state,
        ec2List: [{
          x: 400,
          y: 270,
          width: 90,
          height: 90,
          resource: samples.ec2
        }],
        vpcList: [{
          x: 160,
          y: 125,
          width: 600,
          height: 400,
          resource: samples.vpc
        }],
        subnetList: [{
          x: 210,
          y: 170,
          width: 500,
          height: 300,
          resource: samples.subnet
        }],
        routeTableList: [{
          resource: samples.routeTable
        }],
        securityGroupList: [{
          resource: samples.securityGroup
        }],
        internetGatewayList: [{
          x: 160,
          y: 90,
          width: 70,
          height: 70,
          resource: samples.internetGateway
        }]
      }
    default:
      return state
  }
}
