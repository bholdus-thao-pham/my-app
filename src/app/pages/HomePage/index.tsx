import { Helmet } from 'react-helmet-async';
import { PageWrapper } from 'app/components/PageWrapper';
import ListAccount from './ListAccount';
import TransferPopup from './TransferPopup';
import { useCallback, useState } from 'react';
import { KeyringAddress } from '@polkadot/ui-keyring/types';

export const HomePage = () => {
  console.log('Render Home page');
  const [selectedAccount, setSelectedAccount] = useState<KeyringAddress>(
    {} as KeyringAddress,
  );
  const [isOpen, setIsOpen] = useState(false);
  const closePopup = () => {
    setIsOpen(false);
  };

  const openPopupTransafer = useCallback(
    (item: KeyringAddress) => {
      setSelectedAccount(item);
      setIsOpen(true);
    },
    [setIsOpen],
  );
  return (
    <>
      {isOpen && (
        <TransferPopup sender={selectedAccount} closePopup={closePopup} />
      )}
      <Helmet>
        <title>Muc page</title>
      </Helmet>
      <PageWrapper>
        <ListAccount openPopupTransafer={openPopupTransafer} />
      </PageWrapper>
    </>
  );
};
