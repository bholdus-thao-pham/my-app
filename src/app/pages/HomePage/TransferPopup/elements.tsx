import { styled } from 'styles/stitches.config';

export const Wrapper = styled('div', {
  with: '100%',
  margin: '20px 0',
});

export const WrapperFooter = styled(Wrapper, {
  display: 'flex',
  justifyContent: 'flex-end',
});
