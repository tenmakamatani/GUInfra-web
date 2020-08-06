import { SecurityGroup } from "../../models/aws";

export abstract class SecurityGroupRepository {
  abstract async create(securityGroup: SecurityGroup): Promise<string>;
  abstract async deleteAll(): Promise<void>;
}
