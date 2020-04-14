import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { IStore } from "./modules/store";
import { countActions } from "./modules/count";

export const App = () => {
  const countState = useSelector((state: IStore) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{countState.isFetching ? "..." : countState.count}</h1>
      <button
        onClick={() => {
          dispatch(countActions.requestGet());
        }}
      >
        Push!
      </button>
    </div>
  );
};
