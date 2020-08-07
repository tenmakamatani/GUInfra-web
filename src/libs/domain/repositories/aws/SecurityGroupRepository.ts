import { SecurityGroup } from "../../models/aws";

export abstract class SecurityGroupRepository {
  abstract async create(securityGroup: SecurityGroup): Promise<string>;
  abstract async deleteAll(ids: string[]): Promise<void>;
}
