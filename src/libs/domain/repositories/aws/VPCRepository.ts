import { VPC } from "../../models/aws";

export abstract class VPCRepository {
  abstract async create(vpc: VPC): Promise<string>;
  abstract async deleteAll(): Promise<void>;
}
