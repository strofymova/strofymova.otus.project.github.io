import { all } from 'redux-saga/effects';
import { tokenSaga } from './token';
import { initializerSaga } from './initializer';
import { basketSaga } from './basket';

export default function* rootSaga() {
  yield all([tokenSaga(), basketSaga(), initializerSaga()]);
}
