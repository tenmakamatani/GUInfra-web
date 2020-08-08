import { InternetGateway } from "../../models/aws";

export abstract class InternetGatewayRepository {
  abstract async create(internetGateway: InternetGateway): Promise<string>;
  abstract async deleteAll(ids: string[]): Promise<void>;
}
