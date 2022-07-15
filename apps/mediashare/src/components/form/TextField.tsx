import React from 'react';
// Use our own TextInput, which is essentially a clone of react-native-paper's TextInput
// We need more control over label styling etc.
import TextInput from './TextInput';
import styles, { theme } from 'mediashare/styles';

export interface TextFieldProps {
  label?: any;
  value?: string;
  validator?: (val: string) => boolean;
  onChangeText: (val: string) => void;
  disabled?: boolean;
}

export function TextField({ value = '', validator = () => false, onChangeText, disabled = false, label = '', ...rest }: TextFieldProps & any) {
  return (
    <TextInput
      // Inject our theme manually we don't have access to the provider here
      theme={theme}
      dense
      mode="flat"
      textAlign="left"
      label={label}
      value={value}
      error={validator(value)}
      onChangeText={onChangeText}
      autoCapitalize="none"
      disabled={disabled}
      style={styles.textField}
      {...rest}
    />
  );
}
