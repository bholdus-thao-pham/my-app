import { WsProvider, ApiPromise } from '@polkadot/api';
import React, { useEffect, useState } from 'react';
import { Web3State } from './type';
import { keyring } from '@polkadot/ui-keyring';
import type { ChainType } from '@polkadot/types/interfaces';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import { isTestChain } from '@polkadot/util';
import PageLoading from 'app/components/PageLoading';

let api: ApiPromise;
interface ChainData {
  // properties: ChainProperties;
  name: string;
  version: string;
  type: ChainType;
  chain: string;
}

export { api };

async function retrieveChain(api: ApiPromise): Promise<ChainData> {
  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion, type] = await Promise.all([
    // api.rpc.system.properties(),
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
    api.rpc.system.chainType(),
  ]);

  return {
    name: nodeName.toString(),
    type,
    chain: chain.toString(),
    version: nodeVersion.toString(),
  };
}

async function loadOnReady(api: ApiPromise): Promise<Web3State> {
  const { type, chain } = await retrieveChain(api);
  const isDevelopment =
    type.isDevelopment || type.isLocal || isTestChain(chain);

  //initialise Keyring via 'loadAll' before use
  cryptoWaitReady().then(() => {
    keyring.loadAll({
      ss58Format: 2209,
      genesisHash: api.genesisHash,
      isDevelopment,
      type: 'sr25519',
    });
  });

  console.log(`chain: ${chain} (${type.toString()})`);
  return {
    isDevelopment,
    isApiReady: true,
    api,
  };
}

export const Web3Context = React.createContext<Web3State>({} as Web3State);

const Web3ContextProvider = props => {
  const [value, setValue] = useState<Web3State>({
    isApiReady: false,
    api,
    isDevelopment: false,
  });
  useEffect((): void => {
    // Initialise the provider to connect to node
    let provider = new WsProvider(
      'wss://api.testnet.bholdus.net/blockchain-wss',
    );

    // Create the API and wait until ready
    api = new ApiPromise({ provider });
    api.on('ready', () => {
      loadOnReady(api).then(response => {
        setValue(response);
      });
    });
  }, []);
  if (!value.isApiReady) {
    return <PageLoading />;
  }
  return (
    <Web3Context.Provider value={value}>{props.children}</Web3Context.Provider>
  );
};

export default Web3ContextProvider;
