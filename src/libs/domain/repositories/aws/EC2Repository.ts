import { EC2 } from "../../models/aws";
import { BaseRepository } from "../BaseRepository";

export abstract class EC2Repository extends BaseRepository<EC2> {
  abstract async create(ec2: EC2, securityGroupIds: string[]): Promise<string>;
  abstract async deleteAll(ids: string[]): Promise<void>;
}
