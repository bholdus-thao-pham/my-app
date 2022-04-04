import Popup from 'app/components/Popup';
import { useState } from 'react';
import TransferStep1 from './TransferStep1';
import TransferStep2 from './TransferStep2';
import { TransactionInfo, TransferPopupProps } from './type';
import { useApi } from 'app/hook/useApi';
import keyring from '@polkadot/ui-keyring';
import Big from 'big.js';
import { toast } from 'react-toastify';

const TransferPopup = (props: TransferPopupProps) => {
  const { api } = useApi();
  const { sender, closePopup } = props;
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState('Step 1');
  const [transactionInfo, setTransactionInfo] = useState<TransactionInfo>(
    {} as TransactionInfo,
  );
  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return <TransferStep1 sender={sender} nextStep={finishStep1} />;
      case 2:
        return <TransferStep2 nextStep={finishStep2} sender={sender} />;
      default:
        return <TransferStep1 sender={sender} nextStep={finishStep1} />;
    }
  };
  const finishStep1 = (info: TransactionInfo) => {
    setTransactionInfo(info);
    setTitle('Step 2');
    setCurrentStep(2);
  };
  const finishStep2 = async () => {
    try {
      const sender = keyring.getPair(transactionInfo.sender.address);
      const amountStr = Big(transactionInfo.amount)
        .times(Big(10).pow(18))
        .toFixed();
      const unsub = await api.tx.balances
        .transfer(transactionInfo.recipient, amountStr)
        .signAndSend(sender, ({ events = [], status }) => {
          console.log(`Current status is ${status.type}`);
          if (status.isInBlock) {
            toast.info('In block');
          } else if (status.isFinalized) {
            toast.info('Finalized');
            console.log(
              `Transaction included at blockHash ${status.asFinalized}`,
            );
            // Loop through Vec<EventRecord> to display all events
            events.forEach(({ phase, event: { data, method, section } }) => {
              console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
            });

            unsub();
          }
        });
      closePopup();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  return (
    <Popup closePopup={closePopup} title={title}>
      {renderContent()}
    </Popup>
  );
};

export default TransferPopup;
