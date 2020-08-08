import { Id } from "../base";
import { AWSResource, ITag } from "./common/AWSResource";

interface IInternetGateway {}

export class InternetGateway extends AWSResource<IInternetGateway> {
  readonly id: InternetGatewayId;

  constructor(init: {
    id?: string;
    properties: IInternetGateway;
    tags: ITag[];
  }) {
    super(init);
    this.id = new InternetGatewayId(init.id);
  }
}

export class InternetGatewayId extends Id {}
