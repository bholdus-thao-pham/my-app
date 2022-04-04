import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import accountsSaga from './saga';
import { Account, AccountState } from './type';

export const initialState: AccountState = {
  accounts: [],
};

const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    getAccounts(state) {},
    setAccounts(state, action: PayloadAction<Account[]>) {
      state.accounts = action.payload;
    },
  },
});

export const accountActions = slice.actions;

export const useAccountsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: accountsSaga });
  return { actions: slice.actions };
};
