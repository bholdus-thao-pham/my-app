import { CSS } from '@stitches/react';
import React from 'react';

export interface ValidationRules {
  require?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface InputProps {
  type: string;
  name: string;
  label: string;
  css?: CSS;
  placeholder?: string;
  value?: string | number;
  readonly?: boolean;
  disabled?: boolean;
  isValid?: boolean;
  require?: boolean;
  [other: string]: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
