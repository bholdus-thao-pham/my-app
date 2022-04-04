import { KeyringAddress } from '@polkadot/ui-keyring/types';

export interface TransferStep1Props {
  nextStep: (info: TransactionInfo) => void;
  sender: KeyringAddress;
}

export interface TransferStep2Props {
  nextStep: () => void;
  sender: KeyringAddress;
}

export interface TransferPopupProps {
  sender: KeyringAddress;
  closePopup: () => void;
}

export interface TransactionInfo {
  sender: KeyringAddress;
  amount: string | number;
  recipient: string;
}
