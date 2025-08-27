import type { CaseReducer, PayloadAction, SliceSelectors } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Product } from '../entities/products.types';

export const PRODUCTS_KEY = 'products';

export interface ProductsState {
  items: Product[];
  lastPage?: number;
  totalCount: number;
}

export const productsSlice = createSlice<
  ProductsState,
  {
    set: CaseReducer<ProductsState, PayloadAction<ProductsState>>;
    add: CaseReducer<ProductsState, PayloadAction<ProductsState>>;
    save: CaseReducer<ProductsState, PayloadAction<Product>>;
    reset: CaseReducer<ProductsState>;
  },
  'products',
  SliceSelectors<ProductsState>,
  'products'
>({
  name: 'products',
  initialState: {
    items: [],
    totalCount: 0,
    lastPage: 0,
  },
  reducers: {
    set: (state, action) => {
      state.items = action.payload.items;
      state.totalCount = action.payload.items.length;
      state.lastPage = action.payload.lastPage;
    },
    add: (state, action) => {
      state.items = [...action.payload.items, ...state.items];
      state.totalCount += action.payload.items.length;
      state.lastPage = action.payload.lastPage;
    },
    save: (state, action) => {
      const existingIndex = state.items.findIndex((product) => product.id === action.payload.id);
      if (existingIndex === -1) {
        state.items = [action.payload, ...state.items];
        state.totalCount += 1;
      } else {
        state.items[existingIndex] = action.payload;
      }
    },
    reset: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.lastPage = 0;
    },
  },
});

export const productsActions = {
  ...productsSlice.actions,
};

export const productsSelectors = {
  get: (state: RootState): Product[] => state.products.items,
  getLastPage: (state: RootState): number => state.products.lastPage,
  getTotalCount: (state: RootState): number => state.products.totalCount,
  getById:
    (id: string) =>
    (state: RootState): Product | undefined =>
      state.products.items.find((product) => product.id === id),
};

export const products = productsSlice.reducer;
