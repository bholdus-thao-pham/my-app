import { Balance } from '@polkadot/types/interfaces';
import type { DeriveBalancesAll } from '@polkadot/api-derive/types';
import { useEffect, useState } from 'react';
import { useApi } from './useApi';
import type { ITuple } from '@polkadot/types/types';
import type { Struct, bool } from '@polkadot/types';
import { useCall } from './useCall';

export type BalanceInfo = {
  free: Balance;
};

export interface BholdusTokensAssetBalance extends Struct {
  readonly free: Balance;
  readonly reserved: Balance;
  readonly is_frozen: bool;
  readonly sufficient: bool;
  readonly extra: ITuple<[]>;
}

export const useBalance = (address: string): BalanceInfo | undefined => {
  const { api, isApiReady } = useApi();
  const [balanceInfo, setBalanceInfo] = useState<BalanceInfo>();
  const [balanceAPI, setBalanceAPI] = useState<any>(undefined);
  const [params, setParams] = useState<any[]>([address]);
  useEffect(() => {
    if (isApiReady && address) {
      setBalanceAPI(() => api.derive.balances.all);
      setParams([address]);
    }
  }, [api, address, isApiReady]);

  const data = useCall(isApiReady && balanceAPI, params);

  useEffect(() => {
    if (!data) {
      return undefined;
    }
    let _data = data as DeriveBalancesAll;
    setBalanceInfo({
      free: _data.freeBalance,
    });
  }, [data]);

  return balanceInfo;
};
