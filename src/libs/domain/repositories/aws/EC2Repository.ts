import { EC2 } from "../../models/aws";

export abstract class EC2Repository {
  abstract async create(ec2: EC2): Promise<void>;
  abstract async deleteAll(): Promise<void>;
}
