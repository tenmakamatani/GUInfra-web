import { AllResource } from "../models";

export abstract class BaseRepository<R extends AllResource> {
  abstract async create(r: R): Promise<void>;
  abstract async delete(rId: R["id"]): Promise<void>;
}
