import { IAWSState } from "../../domain/state/aws";

export abstract class CreateAWSResourceUseCase {
  abstract async execute(resources: Omit<IAWSState, "metadata">): Promise<void>;
}
