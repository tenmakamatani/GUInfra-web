import { Container } from "inversify";

import { TYPES } from "../types";
import { IAWSState } from "../domain/state/aws";
import { EC2Repository, VPCRepository } from "../domain/repositories/aws";
import { SdkEC2Repository, SdkVPCRepository } from "../infrastructure/aws";
import { CreateAWSResourceUseCase } from "./usecases/CreateAWSResourceUseCase";
import { CreateAWSResourceInteractor } from "./interactors/CreateAWSResourceInteractor";

const container = new Container();

export class DI {
  static setup(metadata: IAWSState["metadata"]) {
    container
      .bind<EC2Repository>(TYPES.EC2Repository)
      .toConstantValue(new SdkEC2Repository(metadata));
    container
      .bind<VPCRepository>(TYPES.VPCRepository)
      .toConstantValue(new SdkVPCRepository(metadata));
    container
      .bind<CreateAWSResourceUseCase>(TYPES.CreateAWSResourceUseCase)
      .to(CreateAWSResourceInteractor)
      .inSingletonScope();
  }

  static get ec2Repo() {
    return container.get<EC2Repository>(TYPES.EC2Repository);
  }
  static get vpcRepo() {
    return container.get<VPCRepository>(TYPES.VPCRepository);
  }
  static get createAWSResourceUseCase() {
    return container.get<CreateAWSResourceUseCase>(
      TYPES.CreateAWSResourceUseCase
    );
  }
}
