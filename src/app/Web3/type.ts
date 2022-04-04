import { ApiPromise } from '@polkadot/api';

export interface Web3State {
  isApiReady: boolean;
  api: ApiPromise;
  isDevelopment: boolean;
}
