import { Container } from "inversify";

import { TYPES } from "../types";
import { IAWSState } from "../domain/state/aws";
import { VPCRepository } from "../domain/repositories/aws";
import { SdkVPCRepository } from "../infrastructure/aws";

const container = new Container();

export class DI {
  static setup(metadata: IAWSState["metadata"]) {
    container
      .bind<VPCRepository>(TYPES.VPCRepository)
      .toConstantValue(new SdkVPCRepository(metadata));
  }

  static vpcRepo: VPCRepository = container.get<VPCRepository>(
    TYPES.VPCRepository
  );
}
