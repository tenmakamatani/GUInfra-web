import { Provider } from "./Provider";

// 全てのリソースの抽象として使用する
export abstract class AllResource {}

export abstract class Resource<T> extends AllResource {
  abstract provider: Provider;
  abstract properties: T;
}
