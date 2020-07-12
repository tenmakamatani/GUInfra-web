import { injectable } from "inversify";

import { IAWSState } from "../../domain/state/aws";

@injectable()
export abstract class AWSResourceUseCase {
  abstract async create(resources: Omit<IAWSState, "metadata">): Promise<void>;
}
