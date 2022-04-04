export interface AddAccountPopupProps {
  closePopup: () => void;
}
export interface AccountState {
  seed: string;
  address: string;
}

export interface CreationResponse {}

export interface NewAccount {
  seed: string;
  name: string;
  pass: string;
  address: string;
}

export interface StepProps {
  nextStep: (seed: string, address: string) => void;
}
export interface Step2Props {
  seed: string;
  nextStep: () => void;
  backStep: () => void;
}

export interface Step3Props {
  nextStep: (name: string, pass: string) => void;
  backStep: () => void;
}

export interface Step4Props {
  seed: string;
  name: string;
  address: string;
  backStep: () => void;
  onSubmit: () => void;
}
