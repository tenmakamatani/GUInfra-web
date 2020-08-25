interface IVpcAndInternetGateway {
  vpcId: string;
  internetGatewayId: string;
}
interface IAssociationAndRouteTable {
  routeTableId: string;
  associationId: string;
}

export class ResourceIdsDependencyDatastore {
  public static vpcAndInternetGateway: IVpcAndInternetGateway[] = [];
  public static associationAndRouteTable: IAssociationAndRouteTable[] = [];

  public static getVpcIdFromInternetGatewayId(id: string) {
    return ResourceIdsDependencyDatastore.vpcAndInternetGateway.find(
      v => v.internetGatewayId === id
    )!.vpcId;
  }
  public static getAssociationIdFromRouteTableId(id: string) {
    return ResourceIdsDependencyDatastore.associationAndRouteTable.find(
      s => s.routeTableId === id
    )!.associationId;
  }

  public static freshAll(): void {
    ResourceIdsDependencyDatastore.vpcAndInternetGateway = [];
    ResourceIdsDependencyDatastore.associationAndRouteTable = [];
  }
}
