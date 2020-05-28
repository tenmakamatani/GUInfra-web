import { inject, injectable } from "inversify";

import { TYPES } from "../../types";
import { IAWSState } from "../../domain/state/aws";
import { VPCRepository } from "../../domain/repositories/aws";
import { CreateAWSResourceUseCase } from "../usecases/CreateAWSResourceUseCase";

@injectable()
export class CreateAWSResourceInteractor extends CreateAWSResourceUseCase {
  private _vpcRepo: VPCRepository;

  constructor(@inject(TYPES.VPCRepository) vpcRepo: VPCRepository) {
    super();
    this._vpcRepo = vpcRepo;
  }

  execute = async (resources: Omit<IAWSState, "metadata">): Promise<void> => {
    const vpcPromises = resources.vpcList.map(vpc => this._vpcRepo.create(vpc));
    await Promise.all(vpcPromises);
  };
}
