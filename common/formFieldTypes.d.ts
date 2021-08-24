import { FormControlProps, ColProps } from 'react-bootstrap';

export interface InputField extends FormControlProps, ColProps {
  label: string;
  name: string;
  rows?: number;
  onFocus?: () => void;
}

export interface CheckboxField extends FormControlProps, ColProps {
  label: string;
  name: string;
  checked: boolean;
  yesLabel?: string;
  noLabel?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectNumberOption {
  label: string;
  value: number;
}
