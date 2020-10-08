import { Container } from "inversify";

import { TYPES } from "../types";
import { IAWSState } from "../domain/state/aws";
import {
  EC2Repository,
  VPCRepository,
  SubnetRepository,
  RouteTableRepository,
  SecurityGroupRepository,
  InternetGatewayRepository
} from "../domain/repositories/aws";
import {
  SdkEC2Repository,
  SdkVPCRepository,
  SdkSubnetRepository,
  SdkRouteTableRepository,
  SdkSecurityGroupRepository,
  SdkInternetGatewayRepository
} from "../infrastructure/aws";
import { Analytics } from "./analytics";
import { LogDatastore } from "./datastore";
import { AWSResourceUseCase } from "./usecases/AWSResourceUseCase";
import { AWSResourceInteractor } from "./interactors/AWSResourceInteractor";

const container = new Container();

export class DI {
  static setup(metadata: IAWSState["metadata"]) {
    container.unbindAll();
    container
      .bind<EC2Repository>(TYPES.EC2Repository)
      .toConstantValue(new SdkEC2Repository(metadata));
    container
      .bind<VPCRepository>(TYPES.VPCRepository)
      .toConstantValue(new SdkVPCRepository(metadata));
    container
      .bind<SubnetRepository>(TYPES.SubnetRepository)
      .toConstantValue(new SdkSubnetRepository(metadata));
    container
      .bind<RouteTableRepository>(TYPES.RouteTableRepository)
      .toConstantValue(new SdkRouteTableRepository(metadata));
    container
      .bind<SecurityGroupRepository>(TYPES.SecurityGroupRepository)
      .toConstantValue(new SdkSecurityGroupRepository(metadata));
    container
      .bind<InternetGatewayRepository>(TYPES.InternetGatewayRepository)
      .toConstantValue(new SdkInternetGatewayRepository(metadata));
    container
      .bind<AWSResourceUseCase>(TYPES.AWSResourceUseCase)
      .to(AWSResourceInteractor)
      .inSingletonScope();
    container
      .bind<LogDatastore>(TYPES.LogDatastore)
      .to(LogDatastore)
      .inSingletonScope();
    container
      .bind<Analytics>(TYPES.Analytics)
      .to(Analytics)
      .inSingletonScope();
  }

  static get ec2Repo() {
    return container.get<EC2Repository>(TYPES.EC2Repository);
  }
  static get vpcRepo() {
    return container.get<VPCRepository>(TYPES.VPCRepository);
  }
  static get subnetRepo() {
    return container.get<SubnetRepository>(TYPES.SubnetRepository);
  }
  static get routeTableRepo() {
    return container.get<RouteTableRepository>(TYPES.RouteTableRepository);
  }
  static get securityGroupRepo() {
    return container.get<SecurityGroupRepository>(
      TYPES.SecurityGroupRepository
    );
  }
  static get internetGatewayRepository() {
    return container.get<InternetGatewayRepository>(
      TYPES.InternetGatewayRepository
    );
  }
  static get awsResourceUseCase() {
    return container.get<AWSResourceUseCase>(TYPES.AWSResourceUseCase);
  }

  static get isAwsResourceUseCaseBound() {
    return container.isBound(TYPES.AWSResourceUseCase);
  }

  static get logger() {
    return container.get<LogDatastore>(TYPES.LogDatastore);
  }

  static get analytics() {
    return container.get<Analytics>(TYPES.Analytics);
  }
}
