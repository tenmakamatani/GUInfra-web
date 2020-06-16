import { Resource } from "@libs/domain/models/base";

export interface withBaseUI<R extends Resource> {
  x: number;
  y: number;
  width: number;
  height: number;
  resource: R;
}
