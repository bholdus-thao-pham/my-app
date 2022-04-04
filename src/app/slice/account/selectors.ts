import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.account || initialState;

export const selectAccounts = createSelector([selectSlice], state => state);
