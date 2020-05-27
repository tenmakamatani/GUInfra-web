import { VPC } from "../../models/aws";

export abstract class VPCRepository {
  abstract async create(vpc: VPC): Promise<void>;
  abstract async deleteAll(): Promise<void>;
}
