import { Resource, Provider } from "../../base";

interface ITag {
  key: string;
  value: string;
}

export abstract class AWSResource<T> extends Resource<T> {
  readonly provider = Provider.AWS;
  public tags: ITag[] = [];
}
