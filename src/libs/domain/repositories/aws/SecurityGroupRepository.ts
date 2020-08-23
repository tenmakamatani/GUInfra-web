import { SecurityGroup } from "../../models/aws";
import { BaseRepository } from "../BaseRepository";

export abstract class SecurityGroupRepository extends BaseRepository<
  SecurityGroup
> {}
