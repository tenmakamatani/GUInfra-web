import { Subnet } from "../../models/aws";

export abstract class SubnetRepository {
  abstract async create(subnet: Subnet): Promise<string>;
  abstract async deleteAll(ids: string[]): Promise<void>;
}
