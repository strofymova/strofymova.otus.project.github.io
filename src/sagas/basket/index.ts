import { BasketProduct } from '../../entities/base.types';
import { BasketChannel } from './BasketChannel';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { storage } from '../../shared/storage/storage';
import { BASKET_KEY, basketActions, basketSelectors } from '../../store/basket';

const basketChannel = new BasketChannel('basket-saver-channel');

function parseBasketData(basketData: string | null): BasketProduct[] {
  if (!basketData) return [];

  try {
    const reviver = (key: string, value: string) => {
      if (key === 'product' && typeof value === 'string') {
        try {
          const basketProduct: BasketProduct = JSON.parse(value);
          return basketProduct;
        } catch {
          return null;
        }
      }
      if (key === 'count') return Number(value) || 0;
      return value;
    };

    const parsed = JSON.parse(basketData, reviver);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to parse basket data:', error);
    return [];
  }
}

export function* getBasket() {
  const basketData: string = storage.get(BASKET_KEY);
  const basket: BasketProduct[] = parseBasketData(basketData);
  yield put(basketActions.set(basket));
}

export function* setBasket(): Generator {
  const basket: BasketProduct[] = yield select(basketSelectors.get);
  basketChannel.setBasket(basket);
  if (basket) storage.set(BASKET_KEY, JSON.stringify(basket));
}

export function* basketSaga() {
  yield call(getBasket);
  yield takeEvery(
    [
      basketActions.clear().type,
      basketActions.set().type,
      basketActions.update().type,
      basketActions.remove().type,
      basketActions.add().type,
    ],
    setBasket
  );
}
