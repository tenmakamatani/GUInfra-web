import { Container } from "inversify";

import { TYPES } from "../types";
import { IAWSState } from "../domain/state/aws";
import {
  EC2Repository,
  VPCRepository,
  SecurityGroupRepository
} from "../domain/repositories/aws";
import {
  SdkEC2Repository,
  SdkVPCRepository,
  SdkSecurityGroupRepository
} from "../infrastructure/aws";
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
      .bind<SecurityGroupRepository>(TYPES.SecurityGroupRepository)
      .toConstantValue(new SdkSecurityGroupRepository(metadata));
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
  static get securityGroupRepo() {
    return container.get<SecurityGroupRepository>(
      TYPES.SecurityGroupRepository
    );
  }
  static get awsResourceUseCase() {
    return container.get<AWSResourceUseCase>(TYPES.AWSResourceUseCase);
  }
}
