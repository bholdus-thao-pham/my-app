import * as React from 'react';
import { styled } from '@stitches/react';

export function Logo() {
  return (
    <Wrapper>
      <Title>Logo</Title>
    </Wrapper>
  );
}

export const Wrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

const Title = styled('div', {
  fontSize: '1.25rem',
  color: 'white',
  fontWeight: 'bold',
  marginRight: '1rem',
});
