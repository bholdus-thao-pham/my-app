import { KeyringAddress } from '@polkadot/ui-keyring/types';

export interface ListAcountProps {
  openPopupTransafer: (item: KeyringAddress) => void;
}

export interface Account {
  address: string;
  name: any;
  balances: number;
  type: string;
  tags: any;
}
