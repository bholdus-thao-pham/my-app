import keyring from '@polkadot/ui-keyring';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, NoData, Table, TableHeader, Wrapper } from './elements';
import { Account, ListAcountProps } from './type';
import Balance from 'app/components/Balance';
import Button from 'app/components/Button';
import { KeyringAddress } from '@polkadot/ui-keyring/types';
import { sendIconSrc } from 'utils/constants';

const ListAccount = (props: ListAcountProps) => {
  console.log('Rendering list Account');
  const { openPopupTransafer } = props;
  const [listAccount, setListAccount] = useState<KeyringAddress[]>([]);
  const [listDataDisplay, setListDataDisplay] = useState<Account[]>();

  useEffect(() => {
    console.log('Get all account');
    const result = keyring.getAccounts();
    let accounts: Account[] = [];
    result.forEach(({ address }) => {
      const item = keyring.getPair(address);
      accounts.push({
        name: item.meta.name,
        tags: item.meta.tags,
        type: item.type,
        address: item.address,
        balances: 0,
      });
    });
    setListAccount(result);
    setListDataDisplay(accounts);
  }, [setListDataDisplay, setListAccount]);

  const selectedItem = useCallback(
    (address: string) => {
      let raw_data = listAccount.filter(item => {
        const keyPair = keyring.getPair(item.address);
        if (keyPair.address === address) return item;
      });
      openPopupTransafer(raw_data[0]);
    },
    [listAccount, openPopupTransafer],
  );

  const history = useHistory();
  const addAccount = () => {
    history.push('/add-account');
  };

  const tableData = () => {
    return listDataDisplay?.map(item => (
      <tr key={item.address}>
        <td>{item.address}</td>
        <td>{item.name}</td>
        <td>{item.type}</td>
        <td>
          <Balance address={item.address} />
        </td>
        <td>
          <Button
            className="none-border"
            onClickFunction={() => selectedItem(item.address)}
          >
            <Icon src={sendIconSrc} />
            send
          </Button>
        </td>
      </tr>
    ));
  };
  const renderContent = () => {
    if (listDataDisplay && listDataDisplay.length > 0) {
      return (
        <Table>
          <tbody>
            <TableHeader>
              <td>ADDRESS</td>
              <td>NAME</td>
              <td>TYPE</td>
              <td>BALANCES</td>
              <td></td>
            </TableHeader>
            {tableData()}
          </tbody>
        </Table>
      );
    } else {
      return <NoData>There no data</NoData>;
    }
  };

  return (
    <Wrapper>
      <Button onClickFunction={addAccount}>ADD ACCOUNT</Button>
      {renderContent()}
    </Wrapper>
  );
};

export default ListAccount;
