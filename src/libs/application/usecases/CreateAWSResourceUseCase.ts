import { injectable } from "inversify";

import { IAWSState } from "../../domain/state/aws";

@injectable()
export abstract class CreateAWSResourceUseCase {
  abstract async execute(resources: Omit<IAWSState, "metadata">): Promise<void>;
}
