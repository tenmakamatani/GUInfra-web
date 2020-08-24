interface IVpcAndInternetGateway {
  vpcId: string;
  internetGatewayId: string;
}

export class ResourceIdsDependencyDatastore {
  public static vpcAndInternetGateway: IVpcAndInternetGateway[] = [];

  public static getVpcIdFromInternetGatewayId(id: string) {
    return ResourceIdsDependencyDatastore.vpcAndInternetGateway.find(
      v => v.internetGatewayId === id
    )!.vpcId;
  }

  public static freshAll(): void {
    ResourceIdsDependencyDatastore.vpcAndInternetGateway = [];
  }
}
