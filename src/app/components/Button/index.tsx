import { styled } from 'styles/stitches.config';
import { ButtonProps } from './type';

const Button = (props: ButtonProps) => {
  const { children, className, onClickFunction, isDisabled } = props;
  const onClickHandler = () => {
    if (isDisabled) return;
    onClickFunction();
  };
  return (
    <ButtonWrapper
      className={className}
      onClick={onClickHandler}
      isDisabled={isDisabled}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;

const ButtonWrapper = styled('button', {
  padding: '4px 8px',
  border: '1px solid $lightPink',
  cursor: 'pointer',
  color: '$lightPink',
  background: 'none',
  borderRadius: 3,
  margin: '8px 0',
  outline: 'none',
  '&.none-border': {
    border: 'none',
    color: 'white',
  },
  '&:hover': {
    background: '$hoverBackground',
  },
  '& + button': {
    marginLeft: 8,
  },
  variants: {
    isDisabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
  },
});
