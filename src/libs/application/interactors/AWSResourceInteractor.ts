import { inject, injectable } from "inversify";

import { TYPES } from "../../types";
import { IAWSState } from "../../domain/state/aws";
import { EC2Repository, VPCRepository } from "../../domain/repositories/aws";
import { AWSResourceUseCase } from "../usecases/AWSResourceUseCase";

@injectable()
export class AWSResourceInteractor extends AWSResourceUseCase {
  private _ec2Repo: EC2Repository;
  private _vpcRepo: VPCRepository;

  constructor(
    @inject(TYPES.EC2Repository) ec2Repo: EC2Repository,
    @inject(TYPES.VPCRepository) vpcRepo: VPCRepository
  ) {
    super();
    this._ec2Repo = ec2Repo;
    this._vpcRepo = vpcRepo;
  }

  create = async (resources: Omit<IAWSState, "metadata">): Promise<void> => {
    const ec2Promises = resources.ec2List.map(ec2 => this._ec2Repo.create(ec2));
    const vpcPromises = resources.vpcList.map(vpc => this._vpcRepo.create(vpc));
    await Promise.all([ec2Promises, vpcPromises]);
  };

  deleteAll = async (): Promise<void> => {
    await Promise.all([this._ec2Repo.deleteAll(), this._vpcRepo.deleteAll()]);
  };
}
