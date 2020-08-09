import { RouteTable } from "../../models/aws";
import { BaseRepository } from "../BaseRepository";

export abstract class RouteTableRepository extends BaseRepository<RouteTable> {
  abstract async create(
    routeTable: RouteTable,
    vpcId: string,
    gatewayId?: string
  ): Promise<string>;
  abstract async deleteAll(ids: string[]): Promise<void>;
}
