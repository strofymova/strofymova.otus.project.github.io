import type { CaseReducer, PayloadAction, SliceSelectors } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Category } from '../entities/categories.types';

export const CATEGORIES_KEY = 'categories';

export interface CategoriesState {
  items: Category[];
  lastPage?: number;
  totalCount: number;
}

export const categoriesSlice = createSlice<
  CategoriesState,
  {
    set: CaseReducer<CategoriesState, PayloadAction<CategoriesState>>;
    add: CaseReducer<CategoriesState, PayloadAction<CategoriesState>>;
    save: CaseReducer<CategoriesState, PayloadAction<Category>>;
    reset: CaseReducer<CategoriesState>;
  },
  'categories',
  SliceSelectors<CategoriesState>,
  'categories'
>({
  name: 'categories',
  initialState: {
    items: [],
    totalCount: 0,
    lastPage: 0,
  },
  reducers: {
    set: (state, action) => {
      state.items = action.payload.items;
      state.totalCount = action.payload.items.length;
      state.lastPage = 1;
    },
    add: (state, action) => {
      state.items = [...state.items, ...action.payload.items];
      state.totalCount += action.payload.items.length;
      state.lastPage += 1;
    },
    save: (state, action) => {
      const existingIndex = state.items.findIndex((category) => category.id === action.payload.id);
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

export const categoriesActions = {
  ...categoriesSlice.actions,
};

export const categoriesSelectors = {
  get: (state: RootState): Category[] => state.categories.items,
  getLastPage: (state: RootState): number => state.categories.lastPage,
  getTotalCount: (state: RootState): number => state.categories.totalCount,
  getById:
    (id: string) =>
    (state: RootState): Category | undefined =>
      state.categories.items.find((category) => category.id === id),
};

export const categories = categoriesSlice.reducer;
