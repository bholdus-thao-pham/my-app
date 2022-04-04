import { Web3Context } from 'app/Web3';
import { Web3State } from 'app/Web3/type';
import { useContext } from 'react';

export const useApi = (): Web3State => {
  return useContext(Web3Context);
};
