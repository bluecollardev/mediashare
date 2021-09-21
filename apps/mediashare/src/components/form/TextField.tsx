import React from 'react';

import { TextInput } from 'react-native-paper';

export interface TextFieldProps {
  label?: string;
  value?: string;
  validator?: (val: string) => boolean;
  onChangeText: (val: string) => void;
  disabled?: boolean;
}

export default function TextField({ value = '', validator = (val) => true, onChangeText, disabled = false, label = '' }: TextFieldProps) {
  return (
    <TextInput
      dense
      mode={'outlined'}
      textAlign={'left'}
      label={label}
      value={value}
      error={validator(value)}
      onChangeText={onChangeText}
      disabled={disabled}
      style={{ marginBottom: 10 }}
    />
  );
}
