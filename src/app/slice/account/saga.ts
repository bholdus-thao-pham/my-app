import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { accountActions } from '.';
import { Account } from './type';

function* getAccount(action: PayloadAction<Account>) {}

export default function* accountsSaga() {
  yield takeLatest(accountActions.getAccounts.type, getAccount);
}
