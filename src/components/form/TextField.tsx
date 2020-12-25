import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Item, Label, Input } from 'native-base';
import { WrappedFieldProps } from 'redux-form';

export interface TextFieldProps extends WrappedFieldProps {
  label?: string;
}

export default function TextField(props: TextFieldProps) {
  const { touched, error } = props.meta;
  const { input, label } = props;

  let hasError = false;
  if (error !== undefined) {
    hasError = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let isTouched = false;
  if (touched !== undefined) {
    isTouched = true;
  }

  const onFocus = (event) => {
    return input.onFocus({ ...event, relatedTarget: null });
  };

  return (
    <View>
      <Item error={hasError} stackedLabel>
        {label && (
          <Label>
            <Text>{label}</Text>
          </Label>
        )}
        <Input
          {...input}
          onFocus={onFocus}
          style={{ borderColor: 'lightgrey', borderWidth: 1, borderRadius: 3 }}
        />
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>
    </View>
  );
}
