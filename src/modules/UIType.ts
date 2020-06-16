import { AllResource } from "@libs/domain/models/base";

export interface withBaseUI<T extends AllResource> {
  x: number;
  y: number;
  width: number;
  height: number;
  resource: T;
}
