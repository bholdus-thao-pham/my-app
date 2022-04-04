import { Account } from 'app/pages/HomePage/ListAccount/type';

export interface DropDownProps {
  onChangeValue: (value: string) => void;
  value: string | '';
  errorMessage?: string;
  isValid?: boolean;
  require?: boolean;
  listOptions?: Account[];
}
