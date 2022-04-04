import { styled } from '@stitches/react';

export const Wrapper = styled('div', {
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#adadad66',
  backdropFilter: 'blur(5px)',
  zIndex: 1,
});

export const Content = styled('div', {
  backgroundColor: '#2e2e2e',
  width: '60%',
  height: 'fit-content',
  bordeRadius: '10px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  justifyContent: 'space-between',
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  color: 'white',
  fontSize: 14,
  fontWeight: 'lighter',
});

export const AccountAddressWrapper = styled('div', {
  height: 40,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '100%',
  whiteSpace: 'nowrap',
});

export const AddAccountFooter = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
});

export const MnemonicSeedInputWrapper = styled('div', {});

export const ConfirmMnemonicSeedWrapper = styled(MnemonicSeedInputWrapper, {
  height: 100,
  background: '#cbc6c62e',
  borderRadius: 3,
});
export const ListSeedTag = styled(MnemonicSeedInputWrapper, {});

export const Description = styled(MnemonicSeedInputWrapper, {});

export const ConfirmInformationWrapper = styled(MnemonicSeedInputWrapper, {});

export const CloseButton = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: 10,
});
export const Form = styled('form', {});
