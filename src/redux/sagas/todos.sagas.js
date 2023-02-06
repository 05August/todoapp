import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";

import clientServer from "../../server/clientServer";

import { TODO } from "../actionCreator";

function* reqTodosAll(action) {
  try {
    const res = yield call(() =>
      clientServer.get(
        `todoItems${action.payload ? `?status=${action.payload.status}` : ""}`
      )
    );

    yield put({ type: TODO.GET_TODO_SUCCESS, payload: res.data });
  } catch (e) {
    yield put({ type: TODO.GET_TODO_FAILED, payload: e.message });
  }
}

function* mySaga() {
  yield takeLatest(TODO.GET_TODO, reqTodosAll);
}

export default mySaga;
