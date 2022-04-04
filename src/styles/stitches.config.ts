import { createStitches, CSS } from '@stitches/react';

export const { styled, css } = createStitches({
  theme: {
    colors: {
      lightPink: '#d5417c',
      hoverBackground: '#cbc6c62e',
      lightGrayBackground: '#4d4d4d',
    },
  },
});

export const customCss = (attributes: CSS) => attributes;
