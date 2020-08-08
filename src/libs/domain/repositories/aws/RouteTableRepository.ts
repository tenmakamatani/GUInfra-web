import { RouteTable } from "../../models/aws";

export abstract class RouteTableRepository {
  abstract async create(routeTable: RouteTable): Promise<string>;
  abstract async deleteAll(ids: string[]): Promise<void>;
}
