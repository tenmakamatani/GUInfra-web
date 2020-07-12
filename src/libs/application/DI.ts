import { Container } from "inversify";

import { TYPES } from "../types";
import { IAWSState } from "../domain/state/aws";
import { EC2Repository, VPCRepository } from "../domain/repositories/aws";
import { SdkEC2Repository, SdkVPCRepository } from "../infrastructure/aws";
import { AWSResourceUseCase } from "./usecases/AWSResourceUseCase";
import { AWSResourceInteractor } from "./interactors/AWSResourceInteractor";

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
      .bind<AWSResourceUseCase>(TYPES.AWSResourceUseCase)
      .to(AWSResourceInteractor)
      .inSingletonScope();
  }

  static get ec2Repo() {
    return container.get<EC2Repository>(TYPES.EC2Repository);
  }
  static get vpcRepo() {
    return container.get<VPCRepository>(TYPES.VPCRepository);
  }
  static get awsResourceUseCase() {
    return container.get<AWSResourceUseCase>(TYPES.AWSResourceUseCase);
  }
}
