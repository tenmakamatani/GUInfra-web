import { Id } from "./Id";
import { Provider } from "./Provider";

export abstract class Resource<T> {
  abstract readonly id: Id;
  abstract readonly provider: Provider;
  abstract properties: T;
}
