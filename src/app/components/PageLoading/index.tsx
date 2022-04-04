import { styled } from '@stitches/react';
import { LoadingIndicator } from '../LoadingIndicator';

const PageLoading = () => {
  return (
    <LoadingWrapper>
      <LoadingIndicator />
    </LoadingWrapper>
  );
};

export default PageLoading;

const LoadingWrapper = styled('div', {
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
