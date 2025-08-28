import type { CaseReducer, PayloadAction, SliceSelectors } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Profile } from '../entities/profile.types';

export const profileSlice = createSlice<
  Profile,
  { set: CaseReducer<Profile, PayloadAction<Profile>> },
  'profile',
  SliceSelectors<Profile>,
  'profile'
>({
  name: 'profile',
  initialState: null,
  reducers: {
    set: (_, action: PayloadAction<Profile>) => action.payload,
  },
});

export const profileActions = profileSlice.actions;

export const profileSelectors = {
  get: (state: RootState): RootState['profile'] => state.profile,
};

export const profile = profileSlice.reducer;
