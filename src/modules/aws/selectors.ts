import { IStore } from "../store";
import { IAWSState } from "./index";

const selectAll = (store: IStore): IAWSState => {
  return store.aws;
};

export const selectors = {
  selectAll
};
