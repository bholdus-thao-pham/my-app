import { Fragment, useState } from 'react';
import { AddAccountFooter } from './elements';
import { Step2Props } from './type';
import ConfirmSeed from 'app/components/ConfirmSeed';
import Button from 'app/components/Button';
import Icon from 'app/components/Icon';
import { nextIconSrc, prevIconSrc } from 'utils/constants';
import { toast } from 'react-toastify';

const AddAccountStep2 = (props: Step2Props) => {
  const { seed, nextStep, backStep } = props;
  const [selectedSeed, setSelectedSeed] = useState<string[]>([]);
  const nextToStep3 = () => {
    if (selectedSeed.join(' ') === seed.trim()) {
      nextStep();
    } else {
      toast.error('Wrong confirmed information');
    }
  };

  return (
    <Fragment>
      <ConfirmSeed seed={seed} onChangeSelectedSeed={setSelectedSeed} />
      <AddAccountFooter>
        <Button className="none-border" onClickFunction={backStep}>
          <Icon src={prevIconSrc} alt="Next Step"></Icon>
          Prev
        </Button>
        <Button className="none-border" onClickFunction={nextToStep3}>
          Next
          <Icon src={nextIconSrc} alt="Next Step"></Icon>
        </Button>
      </AddAccountFooter>
    </Fragment>
  );
};

export default AddAccountStep2;
