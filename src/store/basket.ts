import type { CaseReducer, PayloadAction, SliceSelectors } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';
import { BasketProduct } from '../entities/base.types';
import { Product } from '../entities/products.types';

export const BASKET_KEY = 'basket';

export const basketSlice = createSlice<
  BasketProduct[],
  {
    set: CaseReducer<BasketProduct[], PayloadAction<BasketProduct[]>>;
    add: CaseReducer<BasketProduct[], PayloadAction<BasketProduct>>;
    update: CaseReducer<BasketProduct[], PayloadAction<Product>>;
    remove: CaseReducer<BasketProduct[], PayloadAction<string>>;
    clear: CaseReducer<BasketProduct[], PayloadAction<void>>;
  },
  'basket',
  SliceSelectors<BasketProduct[]>,
  'basket'
>({
  name: 'basket',
  initialState: [],
  reducers: {
    set: (_, action) => action.payload,
    add: (state, action) => {
      const existingProductIndex = state.findIndex(
        (basketProduct) => basketProduct.product.id === action.payload.product.id
      );
      if (existingProductIndex >= 0) {
        const updatedState = [...state];
        const existingItem = updatedState[existingProductIndex];
        updatedState[existingProductIndex] = {
          ...existingItem,
          count: action.payload.count,
        };
        return updatedState;
      } else {
        const productToAdd = action.payload;
        return [...state, productToAdd];
      }
    },
    update: (state, action) => {
      console.log('upd: ', action.payload);
      const existingProductIndex = state.findIndex((basketProduct) => basketProduct.product.id === action.payload.id);
      if (existingProductIndex === -1) {
        return state;
      }
      const updatedState = [...state];
      updatedState[existingProductIndex] = {
        ...updatedState[existingProductIndex],
        product: action.payload,
      };
      return updatedState;
    },
    remove: (state, action) => state.filter((basketProduct) => basketProduct.product.id !== action.payload),
    clear: () => [],
  },
});

export const basketActions = basketSlice.actions;

export const basketSelectors = {
  get: (state: RootState): RootState['basket'] => state.basket,
  getTotalItems: (state: RootState) => state.basket.reduce((total, basketProduct) => total + basketProduct.count, 0),
  getTotalPrice: (state: RootState) =>
    state.basket.reduce((total, basketProduct) => total + basketProduct.product.price * basketProduct.count, 0),
};

export const basket = basketSlice.reducer;
