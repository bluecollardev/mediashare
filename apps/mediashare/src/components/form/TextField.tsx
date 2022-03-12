import React from 'react';

import { TextInput } from 'react-native-paper';
import styles from '../../styles';

export interface TextFieldProps {
  label?: string;
  value?: string;
  validator?: (val: string) => boolean;
  onChangeText: (val: string) => void;
  disabled?: boolean;
}

export function TextField({ value = '', validator = () => false, onChangeText, disabled = false, label = '', ...rest }: TextFieldProps & any) {
  return (
    <TextInput
      dense
      mode="outlined"
      textAlign="left"
      label={label}
      value={value}
      error={validator(value)}
      onChangeText={onChangeText}
      disabled={disabled}
      style={styles.textField}
      {...rest}
    />
  );
}
