import Button from 'app/components/Button';
import DropDownList from 'app/components/DropdownList';
import Icon from 'app/components/Icon';
import Input from 'app/components/Input';
import React, { useCallback, useEffect, useState } from 'react';
import { nextIconSrc } from 'utils/constants';
import { Wrapper, WrapperFooter } from './elements';
import { TransferStep1Props } from './type';

import { encodeAddress, decodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';
import { useApi } from 'app/hook/useApi';

import Big from 'big.js';
import keyring from '@polkadot/ui-keyring';
import { Account } from '../ListAccount/type';

export const isValidAddress = (address: string) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    return false;
  }
};

const TransferStep1 = (props: TransferStep1Props) => {
  console.log('Render Transfer step 1...');
  const { api } = useApi();
  const { nextStep, sender } = props;
  const { address } = sender;
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isValidRecipient, setIsValidRecipient] = useState(false);
  const [isValidAmount, setIsValidAmount] = useState(false);
  const [maxValue, setMaxValue] = useState('0');
  const [maxTransferable, setMaxTransferable] = useState('0');
  // const { listAccount } = getAllAcoount();
  const [listAccount, setListAccount] = useState<Account[]>([]);
  useEffect(() => {
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
    setListAccount(accounts);
  }, []);
  const test = useCallback(async () => {
    const balance = await api.derive.balances?.all(address);

    const maxBalance = Big(balance.freeBalance);
    const maxExtrinsic = api.tx.balances.transfer(
      address || '',
      maxBalance.toFixed(),
    );
    const paymentInfo = await maxExtrinsic.paymentInfo(address);
    const maxFee = Big(paymentInfo.partialFee.toString());
    const minBalance = Big(api.consts.balances.existentialDeposit);
    const value = maxBalance.minus(minBalance).minus(maxFee);
    setMaxValue(maxBalance.div(Big(10).pow(18)).toFixed(3));
    if (value.s === -1) {
      setMaxTransferable('0');
    } else {
      const stringValue = value.div(Big(10).pow(18)).toFixed(3, Big.roundDown);

      setMaxTransferable(stringValue);
    }
    console.log('Max Value: ', maxValue);
    console.log('Max Transferable: ', maxTransferable);
  }, [api, address, maxValue, maxTransferable]);

  useEffect(() => {
    test();
  }, [test]);
  const changeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmount(value);
    if (value.trim() === '' || +value > +maxTransferable) {
      setIsValidAmount(false);
    } else {
      setIsValidAmount(true);
    }
  };

  const changeRecipient = (value: string) => {
    setRecipient(value);
    if (value.trim() === '' || !isValidAddress(value)) {
      setIsValidRecipient(false);
    } else {
      setIsValidRecipient(true);
    }
  };

  const nextToStep2 = () => {
    const info = {
      sender,
      amount,
      recipient,
    };
    nextStep(info);
  };
  return (
    <>
      <Wrapper>
        <Input
          type="text"
          name="sender"
          label={`Send from ${sender.meta.name}`}
          value={sender.address}
          readonly={true}
        />
      </Wrapper>
      <Wrapper>
        <Input
          type="number"
          name="amount"
          label="Amount"
          value={amount}
          onChange={changeAmount}
          max={maxTransferable}
          require={true}
          isValid={isValidAmount}
        />
      </Wrapper>
      <DropDownList
        onChangeValue={changeRecipient}
        value={recipient}
        isValid={isValidRecipient}
        listOptions={listAccount}
      />
      <WrapperFooter>
        <Button
          onClickFunction={nextToStep2}
          className="none-border"
          isDisabled={!isValidAmount || !isValidRecipient}
        >
          Next
          <Icon src={nextIconSrc} alt={'Close icon'} />
        </Button>
      </WrapperFooter>
    </>
  );
};

export default TransferStep1;
