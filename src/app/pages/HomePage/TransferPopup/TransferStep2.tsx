import keyring, { Keyring } from '@polkadot/ui-keyring';
import Button from 'app/components/Button';
import Icon from 'app/components/Icon';
import Input from 'app/components/Input';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { nextIconSrc } from 'utils/constants';
import { Wrapper, WrapperFooter } from './elements';
import { TransferStep2Props } from './type';

const TransferStep2 = (props: TransferStep2Props) => {
  const { nextStep, sender } = props;
  const senderInfo = keyring.getPair(sender.address);
  const [password, setPassword] = useState('');
  const changePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setPassword(value);
  };
  const nextStepHandler = () => {
    const keypair = keyring.getPair(senderInfo.address || '');
    try {
      keypair.decodePkcs8(password);
      nextStep();
    } catch (err) {
      toast.error('Wrong password');
      return;
    }
  };
  return (
    <>
      <Wrapper>
        <Input
          type="text"
          name="sender"
          label="Sender"
          value={sender.meta.name}
          readonly={true}
        />
      </Wrapper>
      <Wrapper>
        <Input
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={changePass}
        />
      </Wrapper>
      <WrapperFooter>
        <Button onClickFunction={nextStepHandler} className="none-border">
          Next
          <Icon src={nextIconSrc} alt={'Close icon'} />
        </Button>
      </WrapperFooter>
    </>
  );
};

export default TransferStep2;
