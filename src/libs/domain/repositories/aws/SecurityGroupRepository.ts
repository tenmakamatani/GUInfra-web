import { SecurityGroup } from "../../models/aws";
import { BaseRepository } from "../BaseRepository";

export abstract class SecurityGroupRepository extends BaseRepository<
  SecurityGroup
> {
  abstract async create(securityGroup: SecurityGroup): Promise<string>;
  abstract async deleteAll(ids: string[]): Promise<void>;
}
