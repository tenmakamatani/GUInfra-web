import { IState } from "./index";
import { Actions } from "./actions";
import { ActionTypes } from "./types";

const initialState: IState = {
  isFetching: false,
  count: 0,
  error: ""
};

export const reducer = (
  state: IState = initialState,
  action: Actions
): IState => {
  switch (action.type) {
    case ActionTypes.REQUEST_GET:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.SUCCESS_GET:
      return {
        ...state,
        isFetching: false,
        count: action.payload
      };
    case ActionTypes.FAILURE_GET:
      return {
        ...state,
        isFetching: false,
        error: "何らかのエラーが起きました"
      };
    default:
      return state;
  }
};
