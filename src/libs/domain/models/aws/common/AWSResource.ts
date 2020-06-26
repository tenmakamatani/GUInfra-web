import { Id, Resource, Provider } from "../../base";

export interface ITag {
  key: string;
  value: string;
}

export abstract class AWSResource<T> extends Resource<T> {
  // Add additional type in implement class
  abstract readonly id: Id;
  // Init here
  readonly provider = Provider.AWS;
  // Init by implement class
  public properties: T;
  public tags: ITag[] = [];

  constructor(init: { tags: ITag[]; properties: T }) {
    super();
    this.properties = init.properties;
    this.tags = init.tags;
  }

  update(values: { properties?: T; tags?: ITag[] }): void {
    this.properties = values.properties ?? this.properties;
    this.tags = values.tags ?? this.tags;
  }
}
