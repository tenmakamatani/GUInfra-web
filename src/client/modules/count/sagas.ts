import { call, put, fork, take, select } from "redux-saga/effects";
import { actions } from "./actions";
import { ActionTypes } from "./types";
import { selectCountState } from "./selectors";

import { API } from "../../api";

function* handleCount() {
  while (true) {
    yield take(ActionTypes.REQUEST_GET);
    const state = yield select(selectCountState);
    try {
      const count = yield call(API.count, state.count);
      yield put(actions.successGet(count));
    } catch {
      yield put(actions.failureGet());
    }
  }
}

export function* rootSaga() {
  yield fork(handleCount);
}
