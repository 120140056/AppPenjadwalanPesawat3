import { takeEvery, put } from "redux-saga/effects";
import { ADD_ROW, UPDATE_ROW, DELETE_ROW } from "./actions";

function* addRowSaga(action) {
  try {
    yield put({
      type: ADD_ROW,
      row: action.row,
    });
  } catch (e) {
    console.error(e);
  }
}

function* updateRowSaga(action) {
  try {
    yield put({
      type: UPDATE_ROW,
      row: action.row,
    });
  } catch (e) {
    console.error(e);
  }
}

function* deleteRowSaga(action) {
  try {
    yield put({
      type: DELETE_ROW,
      row: action.row,
    });
  } catch (e) {
    console.error(e);
  }
}

export function* watchRows() {
  yield takeEvery(ADD_ROW, addRowSaga);
  yield takeEvery(UPDATE_ROW, updateRowSaga);
  yield takeEvery(DELETE_ROW, deleteRowSaga);
}