import React, { memo, useState } from 'react';
import { styled } from 'styles/stitches.config';
import { expandIconSrc } from 'utils/constants';
import Icon from '../Icon';
import { DropDownProps } from './type';
const DropDownList = memo((props: DropDownProps) => {
  console.log('Render Dropdown..');
  const { onChangeValue, value, isValid, listOptions } = props;
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const toggleShowOptions = () => {
    setIsShowOptions(prev => !prev);
  };

  const onChangeOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue(event.target.value);
  };
  const onChange = value => {
    onChangeValue(value);
    toggleShowOptions();
  };

  const onBlurHandler = () => {
    setIsBlur(true);
  };
  const renderOptions = () => {
    return listOptions?.map(item => (
      <Option key={item.address} onClick={() => onChange(item.address)}>
        <Adress>{item.address}</Adress>
        <Name>{item.name}</Name>
      </Option>
    ));
  };
  return (
    <DropDownWrapper>
      <Lable>{'Recipient'}</Lable>
      <ContentWrapper
        isInvalid={!isValid && isBlur}
        onClick={toggleShowOptions}
      >
        <InputWrapper>
          <Selector
            value={value}
            onChange={onChangeOption}
            onBlur={onBlurHandler}
          />
        </InputWrapper>
        {listOptions && (
          <ExpandButtonWrapper>
            <Icon src={expandIconSrc} alt="Expand" />
          </ExpandButtonWrapper>
        )}
      </ContentWrapper>
      {listOptions && (
        <OptionWrapper isShow={isShowOptions}>{renderOptions()}</OptionWrapper>
      )}
    </DropDownWrapper>
  );
});

export default DropDownList;

const DropDownWrapper = styled('div', {
  margin: '10px auto',
  width: '100%',
  border: 'none',
});

const ContentWrapper = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  height: 40,
  background: '$lightGrayBackground',
  variants: {
    isInvalid: {
      true: {
        border: '1px solid red',
      },
    },
  },
});

const InputWrapper = styled('div', {
  flex: '1 1 0%',
});

const ExpandButtonWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

const Lable = styled('label', {
  display: 'block',
  marginBottom: 10,
  fontWeight: 'bold',
});
const Selector = styled('input', {
  width: '100%',
  height: '100%',
  padding: 8,
  paddingRight: '16px',
  color: 'white',
  background: '$lightGrayBackground',
  border: 'none',
  outline: 'none',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const OptionWrapper = styled('ul', {
  padding: 8,
  overflow: 'auto',
  height: 100,
  borderTop: 'none',
  marginTop: 0,
  listStyleType: 'none',
  background: '$lightGrayBackground',
  variants: {
    isShow: {
      true: {
        display: 'auto',
      },
      false: {
        display: 'none',
      },
    },
  },
});
const Option = styled('li', {
  display: 'flex',
  padding: 4,
  cursor: 'pointer',
  '&:hover': {
    background: '$hoverBackground',
  },
  '&:active': {
    background: '#fbfcfc',
  },
});

const Adress = styled('div', {
  width: 'calc(70% - 8px)',
  marginRight: 8,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: 'Gray',
});
const Name = styled('div', {
  width: 'calc(30% - 8px)',
  marginRight: 8,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontWeight: 500,
});
