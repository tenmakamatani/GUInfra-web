import { Subnet } from "../../models/aws";
import { BaseRepository } from "../BaseRepository";

export abstract class SubnetRepository extends BaseRepository<Subnet> {
  abstract async create(subnet: Subnet, vpcId: string): Promise<string>;
  abstract async deleteAll(ids: string[]): Promise<void>;
}
