import { InternetGateway } from "../../models/aws";
import { BaseRepository } from "../BaseRepository";

export abstract class InternetGatewayRepository extends BaseRepository<
  InternetGateway
> {
  abstract async create(internetGateway: InternetGateway): Promise<string>;
  abstract async deleteAll(ids: string[]): Promise<void>;
}
