import { EC2 } from "../../models/aws";

export abstract class EC2Repository {
  abstract async create(ec2: EC2, securityGroupIds: string[]): Promise<string>;
  abstract async deleteAll(ids: string[]): Promise<void>;
}
