import Button from 'app/components/Button';
import Icon from 'app/components/Icon';
import Input from 'app/components/Input';
import React, { Fragment, useState } from 'react';
import { nextIconSrc, prevIconSrc } from 'utils/constants';
import { AddAccountFooter, Form } from './elements';
import { Step3Props } from './type';

const isValidPassCheck = (pass: string) => {
  if (pass.trim() === '') return false;
  const regex = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
  );
  if (regex.test(pass)) {
    return true;
  }
  return false;
};

const AddAccountStep3 = (props: Step3Props) => {
  const { nextStep, backStep } = props;
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [name, setName] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [isValidPass, setIsValidPass] = useState(false);
  const [isValidPassCfm, setIsValidPassCfm] = useState(false);

  const nextToStep4 = () => {
    console.log('Next to step 4');
    if (!isValidName || !isValidPass || !isValidPassCfm) return;
    nextStep(name, pass);
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    if (value.trim() === '') {
      setIsValidName(false);
    } else {
      setIsValidName(true);
    }
  };

  const onChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPass(value);
    setIsValidPass(isValidPassCheck(value));
  };

  const changeConfirmPass = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setConfirmPass(value);
    if (value.trim() !== '' && value === pass) {
      setIsValidPassCfm(true);
    } else {
      setIsValidPassCfm(false);
    }
  };
  return (
    <Fragment>
      <Form onSubmit={nextToStep4}>
        <Input
          name="name"
          type="text"
          label="Wallet name"
          value={name}
          require={true}
          isValid={isValidName}
          onChange={onChangeName}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          value={pass}
          require={true}
          isValid={isValidPass}
          onChange={onChangePass}
        />
        <Input
          name="confirmedPass"
          type="password"
          label="Confirm Password"
          value={confirmPass}
          require={true}
          isValid={isValidPassCfm}
          onChange={changeConfirmPass}
        />
      </Form>
      <AddAccountFooter>
        <Button className="none-border" onClickFunction={backStep}>
          <Icon src={prevIconSrc} alt="Next Step"></Icon>
          Prev
        </Button>
        <Button
          className="none-border"
          onClickFunction={nextToStep4}
          isDisabled={!isValidName || !isValidPass || !isValidPassCfm}
        >
          Next
          <Icon src={nextIconSrc} alt="Next Step"></Icon>
        </Button>
      </AddAccountFooter>
    </Fragment>
  );
};

export default AddAccountStep3;
