import { Provider } from "./Provider";

// 全てのリソースの抽象として使用する
// Resource<T>はジェネリクスとして使えないのでAllResourceに分離
export abstract class AllResource {}

export abstract class Resource<T> extends AllResource {
  abstract provider: Provider;
  abstract properties: T;
}
