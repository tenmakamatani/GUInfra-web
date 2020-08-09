import { inject, injectable } from "inversify";

import { TYPES } from "../../types";
import { IAWSState } from "../../domain/state/aws";
import { Id } from "@libs/domain/models/base";
import {
  VPCId,
  SecurityGroupId,
  InternetGatewayId
} from "@libs/domain/models/aws";
import {
  EC2Repository,
  VPCRepository,
  SubnetRepository,
  RouteTableRepository,
  SecurityGroupRepository,
  InternetGatewayRepository
} from "../../domain/repositories/aws";
import { AWSResourceUseCase } from "../usecases/AWSResourceUseCase";
import { ResourceIdsDatastore } from "../datastore/ResourceIdsDatastore";

interface IIdsSet<I extends Id> {
  before: I;
  after: string;
}

@injectable()
export class AWSResourceInteractor extends AWSResourceUseCase {
  @inject(TYPES.EC2Repository) private _ec2Repo: EC2Repository;
  @inject(TYPES.VPCRepository) private _vpcRepo: VPCRepository;
  @inject(TYPES.SubnetRepository) private _subnetRepo: SubnetRepository;
  @inject(TYPES.RouteTableRepository)
  private _routeTableRepo: RouteTableRepository;
  @inject(TYPES.SecurityGroupRepository)
  private _securityGroupRepo: SecurityGroupRepository;
  @inject(TYPES.InternetGatewayRepository)
  private _internetGatewayRepo: InternetGatewayRepository;

  async create(resources: Omit<IAWSState, "metadata">): Promise<void> {
    // IdのSetを用意
    const vpcIdSet: IIdsSet<VPCId>[] = [];
    const securityGroupIdsSet: IIdsSet<SecurityGroupId>[] = [];
    const internetGatewayIdSet: IIdsSet<InternetGatewayId>[] = [];

    // 他に依存しない独立したリソースを作成
    const vpcPromises = Promise.all(
      resources.vpcList.map(vpc => this._vpcRepo.create(vpc))
    );
    const securityGroupPromises = Promise.all(
      resources.securityGroupList.map(securityGroup =>
        this._securityGroupRepo.create(securityGroup)
      )
    );
    const internetGatewayPromises = Promise.all(
      resources.internetGatewayList.map(internetGateway =>
        this._internetGatewayRepo.create(internetGateway)
      )
    );
    const [vpcIds, securityGroupIds, internetGatewayIds] = await Promise.all([
      vpcPromises,
      securityGroupPromises,
      internetGatewayPromises
    ]);

    // 依存されるリソースのIDのSetを用意
    for (let i = 0; i < vpcIds.length; i++) {
      vpcIdSet.push({
        before: resources.vpcList[i]!.id,
        after: vpcIds[i]
      });
    }
    for (let i = 0; i < securityGroupIds.length; i++) {
      securityGroupIdsSet.push({
        before: resources.securityGroupList[i]!.id,
        after: securityGroupIds[i]
      });
    }
    for (let i = 0; i < internetGatewayIds.length; i++) {
      internetGatewayIdSet.push({
        before: resources.internetGatewayList[i]!.id,
        after: internetGatewayIds[i]
      });
    }
    // 他のリソースに依存するリソースを作成
    const ec2Promises = Promise.all(
      resources.ec2List.map(ec2 => {
        const ec2SecurityGroupIds = ec2.properties.securityGroupIds.map(sId => {
          return securityGroupIdsSet.find(sIdsSet => {
            return sIdsSet.before.isEqualTo(sId);
          })!.after;
        });
        return this._ec2Repo.create(ec2, ec2SecurityGroupIds);
      })
    );
    const subnetPromises = Promise.all(
      resources.subnetList.map(subnet => {
        const subnetVPCId = vpcIdSet.find(vpcIdSet =>
          vpcIdSet.before.isEqualTo(subnet.properties.vpcId)
        )!.after;
        return this._subnetRepo.create(subnet, subnetVPCId);
      })
    );
    const routeTablePromises = Promise.all(
      resources.routeTableList.map(routeTable => {
        const vpcId = vpcIdSet.find(vpcIdSet =>
          vpcIdSet.before.isEqualTo(routeTable.properties.vpcId)
        )!.after;
        const selectedGatewayId = routeTable.properties.gatewayId;
        const gatewayId = selectedGatewayId
          ? internetGatewayIdSet.find(internetGatewayIdSet =>
              internetGatewayIdSet.before.isEqualTo(selectedGatewayId)
            )!.after
          : undefined;
        return this._routeTableRepo.create(routeTable, vpcId, gatewayId);
      })
    );
    const [ec2Ids, subnetIds, routeTableIds] = await Promise.all([
      ec2Promises,
      subnetPromises,
      routeTablePromises
    ]);
    ResourceIdsDatastore.ec2Ids = ec2Ids;
    ResourceIdsDatastore.vpcIds = vpcIds;
    ResourceIdsDatastore.securityGroupIds = securityGroupIds;
  }

  async deleteAll(): Promise<void> {
    await Promise.all([
      this._ec2Repo.deleteAll(ResourceIdsDatastore.ec2Ids),
      this._vpcRepo.deleteAll(ResourceIdsDatastore.vpcIds)
    ]);
    await Promise.all([
      this._securityGroupRepo.deleteAll(ResourceIdsDatastore.securityGroupIds)
    ]);
    ResourceIdsDatastore.freshAll();
  }
}
