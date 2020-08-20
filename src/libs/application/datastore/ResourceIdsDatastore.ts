import { Id } from "@libs/domain/models/base";
import {
  EC2Id,
  VPCId,
  SubnetId,
  RouteTableId,
  SecurityGroupId,
  InternetGatewayId
} from "@libs/domain/models/aws";

interface IIdsSet<I extends Id> {
  entityId: I;
  resourceId: string;
}

interface IEC2IdSet extends IIdsSet<EC2Id> {}
interface IVPCIdSet extends IIdsSet<VPCId> {}
interface ISubnetIdSet extends IIdsSet<SubnetId> {}
interface IRouteTableIdSet extends IIdsSet<RouteTableId> {}
interface ISecurityGroupIdSet extends IIdsSet<SecurityGroupId> {}
interface IInternetGatewayIdSet extends IIdsSet<InternetGatewayId> {}

export class ResourceIdsDatastore {
  public static ec2Ids: IEC2IdSet[] = [];
  public static vpcIds: IVPCIdSet[] = [];
  public static subnetIds: ISubnetIdSet[] = [];
  public static routeTableIds: IRouteTableIdSet[] = [];
  public static securityGroupIds: ISecurityGroupIdSet[] = [];
  public static internetGatewayIds: IInternetGatewayIdSet[] = [];

  // EntityIdからResourceIdを取得
  public static getVpcResourceId(vpcEntityId: VPCId): string {
    return ResourceIdsDatastore.vpcIds.find(v =>
      v.entityId.isEqualTo(vpcEntityId)
    )!.resourceId;
  }
  public static getSecurityGroupResourceId(
    securityGroupEntityId: SecurityGroupId
  ): string {
    return ResourceIdsDatastore.securityGroupIds.find(s =>
      s.entityId.isEqualTo(securityGroupEntityId)
    )!.resourceId;
  }
  public static getInternetGatewayResourceId(
    internetGatewayEntityId: InternetGatewayId
  ): string {
    return ResourceIdsDatastore.internetGatewayIds.find(i =>
      i.entityId.isEqualTo(internetGatewayEntityId)
    )!.resourceId;
  }

  // 全てのresourceIdを取得
  public static getAllEc2ResourceIds(): string[] {
    return ResourceIdsDatastore.ec2Ids.map(e => e.resourceId);
  }
  public static getAllVpcResourceIds(): string[] {
    return ResourceIdsDatastore.vpcIds.map(v => v.resourceId);
  }
  public static getAllSubnetResourceIds(): string[] {
    return ResourceIdsDatastore.subnetIds.map(s => s.resourceId);
  }
  public static getAllRouteTableResourceIds(): string[] {
    return ResourceIdsDatastore.routeTableIds.map(r => r.resourceId);
  }
  public static getAllSecurityGroupResourceIds(): string[] {
    return ResourceIdsDatastore.securityGroupIds.map(s => s.resourceId);
  }
  public static getAllInternetGatewayResourceIds(): string[] {
    return ResourceIdsDatastore.internetGatewayIds.map(i => i.resourceId);
  }

  // IdをSetする関数
  public static setEc2Id(idSet: IEC2IdSet): void {
    ResourceIdsDatastore.ec2Ids.push(idSet);
  }
  public static setVpcId(idSet: IVPCIdSet): void {
    ResourceIdsDatastore.vpcIds.push(idSet);
  }
  public static setSubnetId(idSet: ISubnetIdSet): void {
    ResourceIdsDatastore.subnetIds.push(idSet);
  }
  public static setRouteTableId(idSet: IRouteTableIdSet): void {
    ResourceIdsDatastore.routeTableIds.push(idSet);
  }
  public static setSecurityGroupId(idSet: ISecurityGroupIdSet): void {
    ResourceIdsDatastore.securityGroupIds.push(idSet);
  }
  public static setInternetGatewayId(idSet: IInternetGatewayIdSet): void {
    ResourceIdsDatastore.internetGatewayIds.push(idSet);
  }

  public static freshAll(): void {
    ResourceIdsDatastore.ec2Ids = [];
    ResourceIdsDatastore.vpcIds = [];
    ResourceIdsDatastore.subnetIds = [];
    ResourceIdsDatastore.routeTableIds = [];
    ResourceIdsDatastore.securityGroupIds = [];
    ResourceIdsDatastore.internetGatewayIds = [];
  }
}
