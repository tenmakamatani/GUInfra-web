import { AllResource } from "@libs/domain/models";

export interface withBaseUI<T extends AllResource> {
  x: number;
  y: number;
  width: number;
  height: number;
  resource: T;
}

export interface withoutBaseUI<T extends AllResource> {
  resource: T;
}
