import Icon from 'app/components/Icon';
import { useState } from 'react';
import AddAccountStep1 from './AddAccountStep1';
import AddAccountStep2 from './AddAccountStep2';
import { Content, Wrapper, CloseButton } from './elements';
import { closeIconSrc } from 'utils/constants';
import AddAccountStep3 from './AddAccountStep3';
import AddAccountStep4 from './AddAccountStep4';
import { NewAccount } from './type';
import keyring from '@polkadot/ui-keyring';
import Button from 'app/components/Button';
import { CreateResult } from '@polkadot/ui-keyring/types';
import FileSaver from 'file-saver';
import { toast } from 'react-toastify';
import PageLoading from 'app/components/PageLoading';
import { useHistory } from 'react-router-dom';
import { useApi } from 'app/hook/useApi';

function downloadAccount({ json, pair }: CreateResult, name) {
  const blob = new Blob([JSON.stringify(json)], {
    type: 'application/json; charset=utf-8',
  });
  FileSaver.saveAs(blob, `BHO-${name}.json`);
}

const createNewAccount = (arg: NewAccount, { genesisHash, isHardware }) => {
  const { seed, pass, name } = arg;
  const result = {
    data: '',
    status: '',
    message: '',
  };
  try {
    const response = keyring.addUri(
      seed,
      pass,
      { genesisHash, isHardware: false, name },
      'sr25519',
    );
    result.status = 'success';
    result.message = 'successful creation';
    downloadAccount(response, name);
  } catch (error) {
    result.status = 'failed';
    result.message = 'Failed creation';
  }
  return result;
};

const AddAccountPopup = () => {
  console.log('Rednder Add new account popup');
  const { api, isDevelopment } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [seed, setSeed] = useState('');
  const [address, setAddress] = useState('');
  const history = useHistory();

  const closePopup = () => {
    history.push('/account');
  };

  const nextToStep2 = (seed: string, address: string) => {
    setSeed(seed);
    setAddress(address);
    setCurrentStep(2);
  };
  const nextToStep3 = () => {
    setCurrentStep(3);
  };
  const nextToStep4 = (name: string, pass: string) => {
    setName(name);
    setPass(pass);
    setCurrentStep(4);
  };

  const backStepHandler = () => {
    switch (currentStep) {
      case 2:
        setCurrentStep(1);
        break;
      case 3:
        setCurrentStep(2);
        break;
      case 4:
        setCurrentStep(3);
        break;
    }
  };

  const createAccount = () => {
    setIsLoading(true);
    const newAccount = {
      seed,
      pass,
      name,
      address,
    };
    const options = {
      genesisHash: isDevelopment ? undefined : api.genesisHash.toString(),
      isHardware: false,
    };
    const result = createNewAccount(newAccount, options);
    if (result.status === 'success') {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
    history.push('/account');
  };

  const stepContent = () => {
    switch (currentStep) {
      case 1:
        return <AddAccountStep1 nextStep={nextToStep2} />;
      case 2:
        return (
          <AddAccountStep2
            seed={seed}
            nextStep={nextToStep3}
            backStep={backStepHandler}
          />
        );
      case 3:
        return (
          <AddAccountStep3 nextStep={nextToStep4} backStep={backStepHandler} />
        );
      case 4:
        return (
          <AddAccountStep4
            name={name}
            address={address}
            seed={seed}
            backStep={backStepHandler}
            onSubmit={createAccount}
          />
        );
      default:
        return <AddAccountStep1 nextStep={nextToStep2}></AddAccountStep1>;
    }
  };
  return (
    <>
      {isLoading && <PageLoading />}
      <Wrapper>
        <Content>
          <CloseButton>
            <Button onClickFunction={closePopup} className="none-border">
              <Icon src={closeIconSrc} alt={'Close icon'} />
            </Button>
          </CloseButton>
          {stepContent()}
        </Content>
      </Wrapper>
    </>
  );
};

export default AddAccountPopup;
