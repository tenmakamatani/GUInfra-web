import { inject, injectable } from "inversify";

import { TYPES } from "../../types";
import { IAWSState } from "../../domain/state/aws";
import {
  EC2Repository,
  VPCRepository,
  SubnetRepository,
  RouteTableRepository,
  SecurityGroupRepository,
  InternetGatewayRepository
} from "../../domain/repositories/aws";
import { AWSResourceUseCase } from "../usecases/AWSResourceUseCase";
import {
  LogDatastore,
  ResourceIdsDatastore,
  ResourceIdsDependencyDatastore
} from "../datastore";

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
    this._logError("test");
    console.log(resources);

    // 他に依存しない独立したリソースを作成
    const vpcPromises = Promise.all(
      resources.vpcList.map(vpc => this._vpcRepo.create(vpc))
    );
    this._logNormal("Creating vpc...");
    await Promise.all([vpcPromises]);
    const internetGatewayPromises = Promise.all(
      resources.internetGatewayList.map(internetGateway =>
        this._internetGatewayRepo.create(internetGateway)
      )
    );
    const securityGroupPromises = Promise.all(
      resources.securityGroupList.map(securityGroup =>
        this._securityGroupRepo.create(securityGroup)
      )
    );
    this._logNormal("Creating internet gateway...");
    this._logNormal("Creating security group...");
    // 他のリソースに依存するリソースを作成
    await Promise.all([internetGatewayPromises, securityGroupPromises]);
    const subnetPromises = Promise.all(
      resources.subnetList.map(subnet => this._subnetRepo.create(subnet))
    );
    const routeTablePromises = Promise.all(
      resources.routeTableList.map(routeTable =>
        this._routeTableRepo.create(routeTable)
      )
    );
    await Promise.all([subnetPromises, routeTablePromises]);
    const ec2Promises = Promise.all(
      resources.ec2List.map(ec2 => this._ec2Repo.create(ec2))
    );
    await Promise.all([ec2Promises]);
    this._freshLog();
  }

  async deleteAll(): Promise<void> {
    await Promise.all([
      ...ResourceIdsDatastore.ec2Ids.map(ec2Id =>
        this._ec2Repo.delete(ec2Id.entityId)
      ),
      ...ResourceIdsDatastore.internetGatewayIds.map(internetGatewayId =>
        this._internetGatewayRepo.delete(internetGatewayId.entityId)
      )
    ]);
    await Promise.all([
      ...ResourceIdsDatastore.subnetIds.map(subnetId =>
        this._subnetRepo.delete(subnetId.entityId)
      ),
      ...ResourceIdsDatastore.routeTableIds.map(routeTableId =>
        this._routeTableRepo.delete(routeTableId.entityId)
      ),
      ...ResourceIdsDatastore.securityGroupIds.map(securityGroupId =>
        this._securityGroupRepo.delete(securityGroupId.entityId)
      )
    ]);
    await Promise.all([
      ...ResourceIdsDatastore.vpcIds.map(vpcId =>
        this._vpcRepo.delete(vpcId.entityId)
      )
    ]);
    ResourceIdsDatastore.freshAll();
    ResourceIdsDependencyDatastore.freshAll();
  }
}
