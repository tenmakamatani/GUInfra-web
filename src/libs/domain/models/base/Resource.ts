import { Provider } from "./Provider";

export abstract class Resource<T> {
  abstract provider: Provider;
  abstract properties: T;
}
