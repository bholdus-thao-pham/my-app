import React from 'react';

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  onClickFunction: () => void;
}
