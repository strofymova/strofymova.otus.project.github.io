import { takeEvery } from 'redux-saga/effects';
import { getToken } from './token';
import { getBasket } from './basket';
import { initializedActions } from '../store/initialized';

export function* initializerSaga() {
  yield takeEvery(initializedActions.init().type, getToken);
  yield takeEvery(initializedActions.init().type, getBasket);
}
