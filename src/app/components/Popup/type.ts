import { CSS } from '@stitches/react';

export interface PopupProps {
  closePopup: () => void;
  css?: CSS;
  title?: string;
  children?: React.ReactNode;
}
