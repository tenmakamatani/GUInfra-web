import { call, put, fork, take } from "redux-saga/effects";
import { actions } from "./actions";
import { ActionTypes } from "./types";

import { API } from "../../api";

function* handleCount() {
  while (true) {
    yield take(ActionTypes.REQUEST_GET);
    try {
      // Todo 現在のstateを参照
      const count = yield call(API.count, 1);
      yield put(actions.successGet(count));
    } catch {
      yield put(actions.failureGet());
    }
  }
}

export function* rootSaga() {
  yield fork(handleCount);
}
