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
import { LogDatastore } from "../datastore/LogDatastore";
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

  private _freshLog(): void {
    LogDatastore.fresh();
  }
  private _logNormal(val: string): void {
    LogDatastore.normal(val);
  }
  private _logError(val: string): void {
    LogDatastore.error(val);
  }

  async create(resources: Omit<IAWSState, "metadata">): Promise<void> {
    // IdのSetを用意
    const vpcIdSet: IIdsSet<VPCId>[] = [];
    const securityGroupIdsSet: IIdsSet<SecurityGroupId>[] = [];
    const internetGatewayIdSet: IIdsSet<InternetGatewayId>[] = [];

    // 他に依存しない独立したリソースを作成
    const vpcPromises = Promise.all(
      resources.vpcList.map(vpc => this._vpcRepo.create(vpc))
    );
    const internetGatewayPromises = Promise.all(
      resources.internetGatewayList.map(internetGateway =>
        this._internetGatewayRepo.create(internetGateway)
      )
    );
    this._logNormal("Creating vpc...");
    this._logNormal("Creating internet gateway...");
    const [vpcIds, internetGatewayIds] = await Promise.all([
      vpcPromises,
      internetGatewayPromises
    ]);

    // 依存されるリソースのIDのSetを用意
    for (let i = 0; i < vpcIds.length; i++) {
      vpcIdSet.push({
        before: resources.vpcList[i]!.id,
        after: vpcIds[i]
      });
    }
    for (let i = 0; i < internetGatewayIds.length; i++) {
      internetGatewayIdSet.push({
        before: resources.internetGatewayList[i]!.id,
        after: internetGatewayIds[i]
      });
    }

    const securityGroupIds = await Promise.all(
      resources.securityGroupList.map(securityGroup => {
        const securityGroupVPCId = vpcIdSet.find(vpcIdSet =>
          vpcIdSet.before.isEqualTo(securityGroup.properties.vpcId)
        )!.after;
        return this._securityGroupRepo.create(
          securityGroup,
          securityGroupVPCId
        );
      })
    );
    for (let i = 0; i < securityGroupIds.length; i++) {
      securityGroupIdsSet.push({
        before: resources.securityGroupList[i]!.id,
        after: securityGroupIds[i]
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
    ResourceIdsDatastore.ec2Ids.push(...ec2Ids);
    ResourceIdsDatastore.vpcIds.push(...vpcIds);
    ResourceIdsDatastore.subnetIds.push(...subnetIds);
    ResourceIdsDatastore.routeTableIds.push(...routeTableIds);
    ResourceIdsDatastore.securityGroupIds.push(...securityGroupIds);
    ResourceIdsDatastore.internetGatewayIds.push(...internetGatewayIds);
    this._freshLog();
  }

  async deleteAll(): Promise<void> {
    await Promise.all([
      this._ec2Repo.deleteAll(ResourceIdsDatastore.ec2Ids),
      this._internetGatewayRepo.deleteAll(
        ResourceIdsDatastore.internetGatewayIds
      )
    ]);
    await Promise.all([
      this._subnetRepo.deleteAll(ResourceIdsDatastore.subnetIds),
      this._securityGroupRepo.deleteAll(ResourceIdsDatastore.securityGroupIds),
      this._routeTableRepo.deleteAll(ResourceIdsDatastore.routeTableIds)
    ]);
    await Promise.all([this._vpcRepo.deleteAll(ResourceIdsDatastore.vpcIds)]);
    ResourceIdsDatastore.freshAll();
  }
}
