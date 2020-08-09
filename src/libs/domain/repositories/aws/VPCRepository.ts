import { VPC } from "../../models/aws";
import { BaseRepository } from "../BaseRepository";

export abstract class VPCRepository extends BaseRepository<VPC> {
  abstract async create(vpc: VPC): Promise<string>;
  abstract async deleteAll(ids: string[]): Promise<void>;
}
