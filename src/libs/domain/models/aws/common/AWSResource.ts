import { Resource, Provider } from "../../base";

export interface ITag {
  key: string;
  value: string;
}

export abstract class AWSResource<T> extends Resource {
  readonly provider = Provider.AWS;
  public properties: T;
  public tags: ITag[] = [];

  constructor(init: { tags: ITag[]; properties: T }) {
    super();
    this.properties = init.properties;
    this.tags = init.tags;
  }
}
