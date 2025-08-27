import type { CaseReducer, PayloadAction, SliceSelectors } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';

export const TOKEN_KEY = 'token';

export const tokenSlice = createSlice<
  string,
  { set: CaseReducer<string, PayloadAction<string>>; logout: CaseReducer<string> },
  'token',
  SliceSelectors<string>,
  'token'
>({
  name: 'token',
  initialState: null,
  reducers: {
    set: (_, action) => action.payload,
    logout: () => null,
  },
});

export const tokenActions = tokenSlice.actions;
export const { reducer: token } = tokenSlice;

export const tokenSelectors = {
  get: (state: RootState): RootState['token'] => state.token,
};
