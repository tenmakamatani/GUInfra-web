export class ResourceIdsDatastore {
  public static vpcIds: string[] = [];
  public static ec2Ids: string[] = [];
  public static securityGroupIds: string[] = [];

  static freshAll = (): void => {
    ResourceIdsDatastore.ec2Ids = [];
    ResourceIdsDatastore.vpcIds = [];
    ResourceIdsDatastore.securityGroupIds = [];
  };
}