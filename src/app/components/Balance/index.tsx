import { useBalance } from 'app/hook/useBalance';
import { styled } from 'styles/stitches.config';
import Big from 'big.js';
import { BalanceProps } from './type';

const Balance = (props: BalanceProps) => {
  const { address } = props;
  const balance = useBalance(address);

  return (
    <BalanceWrapper>
      <BalanceContent>
        {balance?.free
          ? Big(balance?.free.toString()).div(Big(10).pow(18)).toFixed(3)
          : 0}{' '}
      </BalanceContent>
    </BalanceWrapper>
  );
};

export default Balance;

const BalanceWrapper = styled('div', {});

const BalanceContent = styled('p');
