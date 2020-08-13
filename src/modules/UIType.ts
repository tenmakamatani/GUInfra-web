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

export const defaultResourceViewCreator = <T extends AllResource>(
  resource: T
): withBaseUI<T> => ({
  x: window.innerWidth * 0.5,
  y: window.innerHeight * 0.5,
  width: 100,
  height: 100,
  resource: resource
});
