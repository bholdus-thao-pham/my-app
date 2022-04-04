import Button from 'app/components/Button';
import Icon from 'app/components/Icon';
import Input from 'app/components/Input';
import { Fragment } from 'react';
import { nextIconSrc, prevIconSrc } from 'utils/constants';
import { AddAccountFooter, ConfirmInformationWrapper } from './elements';
import { Step4Props } from './type';

const AddAccountStep4 = (props: Step4Props) => {
  const { name, seed, address, onSubmit, backStep } = props;
  return (
    <Fragment>
      <ConfirmInformationWrapper>
        <Input
          type="text"
          name="seed"
          label="Mnemonic Seed"
          value={seed}
          readonly={true}
        />
      </ConfirmInformationWrapper>
      <ConfirmInformationWrapper>
        <Input
          type="text"
          name="adress"
          label="Wallet Address"
          value={address}
          readonly={true}
        />
      </ConfirmInformationWrapper>
      <ConfirmInformationWrapper>
        <Input
          type="text"
          name="name"
          label="Wallet Name"
          value={name}
          readonly={true}
        />
      </ConfirmInformationWrapper>
      <AddAccountFooter>
        <Button className="none-border" onClickFunction={backStep}>
          <Icon src={prevIconSrc} alt="Next Step"></Icon>
          Prev
        </Button>
        <Button className="none-border" onClickFunction={onSubmit}>
          Next
          <Icon src={nextIconSrc} alt="Next Step"></Icon>
        </Button>
      </AddAccountFooter>
    </Fragment>
  );
};

export default AddAccountStep4;
