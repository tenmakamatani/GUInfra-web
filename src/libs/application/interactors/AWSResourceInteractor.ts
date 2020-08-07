import { inject, injectable } from "inversify";

import { TYPES } from "../../types";
import { IAWSState } from "../../domain/state/aws";
import { Id } from "@libs/domain/models/base";
import { SecurityGroupId } from "@libs/domain/models/aws";
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
    const securityGroupIdsSet: IIdsSet<SecurityGroupId>[] = [];
    const vpcPromises = Promise.all(
      resources.vpcList.map(vpc => this._vpcRepo.create(vpc))
    );
    const securityGroupPromises = Promise.all(
      resources.securityGroupList.map(securityGroup =>
        this._securityGroupRepo.create(securityGroup)
      )
    );
    const [vpcIds, securityGroupIds] = await Promise.all([
      vpcPromises,
      securityGroupPromises
    ]);
    for (let i = 0; i < securityGroupIds.length; i++) {
      securityGroupIdsSet.push({
        before: resources.securityGroupList[i]!.id,
        after: securityGroupIds[i]
      });
    }
    const ec2Promises = resources.ec2List.map(ec2 => {
      const ec2SecurityGroupIds = ec2.properties.securityGroupIds.map(sId => {
        return securityGroupIdsSet.find(sIdsSet => {
          return sIdsSet.before.isEqualTo(sId);
        })!.after;
      });
      return this._ec2Repo.create(ec2, ec2SecurityGroupIds);
    });
    const ec2Ids = await Promise.all(ec2Promises);
    ResourceIdsDatastore.ec2Ids = ec2Ids;
    ResourceIdsDatastore.vpcIds = vpcIds;
    ResourceIdsDatastore.securityGroupIds = securityGroupIds;
  }

  async deleteAll(): Promise<void> {
    await Promise.all([this._ec2Repo.deleteAll(), this._vpcRepo.deleteAll()]);
    await Promise.all([this._securityGroupRepo.deleteAll()]);
    ResourceIdsDatastore.freshAll();
  }
}
