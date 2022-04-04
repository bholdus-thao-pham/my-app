import keyring from '@polkadot/ui-keyring';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import Button from 'app/components/Button';
import Icon from 'app/components/Icon';
import Input from 'app/components/Input';
import Paragraph from 'app/components/Paragraph';
import { useApi } from 'app/hook/useApi';
import { Fragment, useMemo } from 'react';
import { nextIconSrc } from 'utils/constants';
import {
  AddAccountFooter,
  Description,
  MnemonicSeedInputWrapper,
} from './elements';
import { AccountState, StepProps } from './type';

const des1 =
  "Your 12-word mnemonic phrase can be used to restore or backup your account if needed. Please make sure you've saved this phrase before continuing to the next step.";
const des2 =
  'Warning: Never disclose this 12-word phrase to anyone, otherwise you may lose access to your account as well as your tokens.';
const generateSeedAndAdd = () => {
  // const keyring = new Keyring();
  const seed = mnemonicGenerate();
  const address = keyring.createFromUri(seed, {}, 'sr25519').address;
  return { seed, address };
};

const AddAccountStep1 = (props: StepProps) => {
  const { nextStep } = props;
  const { isApiReady } = useApi();
  const { seed, address } = useMemo<AccountState>(() => {
    if (isApiReady) {
      return generateSeedAndAdd();
    }
    return {
      address: '',
      seed: '',
    };
  }, [isApiReady]);
  const nextStepHandler = () => {
    nextStep(seed, address);
  };
  return (
    <Fragment>
      <MnemonicSeedInputWrapper>
        <Input
          type="text"
          name="mnemonicSeed"
          label="Mnemonic Seed"
          value={seed}
          readonly={true}
        />
      </MnemonicSeedInputWrapper>
      <Description>
        <Paragraph value={des1}></Paragraph>
        <Paragraph value={des2}></Paragraph>
      </Description>
      <AddAccountFooter>
        <Button className="none-border" onClickFunction={nextStepHandler}>
          Next
          <Icon src={nextIconSrc} alt="Next Step"></Icon>
        </Button>
      </AddAccountFooter>
    </Fragment>
  );
};

export default AddAccountStep1;
