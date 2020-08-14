import { Id, Resource, Provider } from "../../base";

export abstract class AWSResource<T> extends Resource<T> {
  // Add additional type in implement class
  abstract readonly id: Id;
  // Init here
  readonly provider = Provider.AWS;
  // Init by implement class
  public properties: T;

  constructor(init: T) {
    super();
    this.properties = init;
  }

  update(values: T): void {
    this.properties = values ?? this.properties;
  }
}
