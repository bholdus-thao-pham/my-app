import { memo, useState } from 'react';
import { styled } from 'styles/stitches.config';
import { InputProps } from './type';

const Input = memo((props: InputProps) => {
  const {
    type,
    placeholder,
    label,
    value,
    readonly,
    disabled,
    css,
    require,
    isValid,
    onChange,
    ...otherProps
  } = props;

  const [isBlur, setIsBlur] = useState(false);
  const onBlur = () => {
    setIsBlur(true);
  };

  return (
    <InputWrapper>
      <Label>{label}</Label>
      <InputElement
        type={type}
        placeholder={placeholder}
        value={value}
        readOnly={readonly}
        disabled={disabled}
        onChange={onChange}
        isInvalid={require && !isValid && isBlur}
        {...otherProps}
        onBlur={onBlur}
      />
    </InputWrapper>
  );
});
export default Input;

const InputWrapper = styled('div', {
  margin: '8px 0',
});

const Label = styled('label', {
  display: 'block',
  marginBottom: 10,
  fontWeight: 'bold',
});

const InputElement = styled('input', {
  width: '100%',
  height: 40,
  background: '$lightGrayBackground',
  border: 'none',
  color: 'white',
  padding: 8,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  outline: 'none',
  variants: {
    isInvalid: {
      true: {
        border: '1px solid red',
      },
    },
  },
});
