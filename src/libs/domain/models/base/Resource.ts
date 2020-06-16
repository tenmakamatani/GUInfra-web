import { Provider } from "./Provider";

// ジェネリクスなしで全てのリソースの抽象として使用したいため、ジェネリクスは指定しない
export abstract class Resource {
  abstract provider: Provider;
}
