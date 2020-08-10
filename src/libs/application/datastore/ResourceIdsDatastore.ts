export class ResourceIdsDatastore {
  public static ec2Ids: string[] = [];
  public static vpcIds: string[] = [];
  public static subnetIds: string[] = [];
  public static routeTableIds: string[] = [];
  public static securityGroupIds: string[] = [];
  public static internetGatewayIds: string[] = [];

  static freshAll(): void {
    ResourceIdsDatastore.ec2Ids = [];
    ResourceIdsDatastore.vpcIds = [];
    ResourceIdsDatastore.subnetIds = [];
    ResourceIdsDatastore.routeTableIds = [];
    ResourceIdsDatastore.securityGroupIds = [];
    ResourceIdsDatastore.internetGatewayIds = [];
  }
}
