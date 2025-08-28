import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { token } from './token';
import { initialized } from './initialized';
import { profile } from './profile';
import { basket } from './basket';
import { products } from './products';
import { categories } from './categories';
import rootSaga from '../sagas';
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    initialized,
    token,
    profile,
    products,
    basket,
    categories,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
