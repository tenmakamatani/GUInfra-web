import { inject, injectable } from "inversify";

import { TYPES } from "../../types";
import { IAWSState } from "../../domain/state/aws";
import { Id } from "@libs/domain/models/base";
import {
  EC2Repository,
  VPCRepository,
  SecurityGroupRepository
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
  @inject(TYPES.SecurityGroupRepository)
  private _securityGroupRepo: SecurityGroupRepository;

  async create(resources: Omit<IAWSState, "metadata">): Promise<void> {
    const ec2Promises = Promise.all(
      resources.ec2List.map(ec2 => this._ec2Repo.create(ec2))
    );
    const vpcPromises = Promise.all(
      resources.vpcList.map(vpc => this._vpcRepo.create(vpc))
    );
    const securityGroupPromises = Promise.all(
      resources.securityGroupList.map(securityGroup =>
        this._securityGroupRepo.create(securityGroup)
      )
    );
    const [ec2Ids, vpcIds, securityGroupIds] = await Promise.all([
      ec2Promises,
      vpcPromises,
      securityGroupPromises
    ]);
    ResourceIdsDatastore.ec2Ids = ec2Ids;
    ResourceIdsDatastore.vpcIds = vpcIds;
    ResourceIdsDatastore.securityGroupIds = securityGroupIds;
  }

  async deleteAll(): Promise<void> {
    await Promise.all([
      this._ec2Repo.deleteAll(),
      this._vpcRepo.deleteAll(),
      this._securityGroupRepo.deleteAll()
    ]);
    ResourceIdsDatastore.freshAll();
  }
}
