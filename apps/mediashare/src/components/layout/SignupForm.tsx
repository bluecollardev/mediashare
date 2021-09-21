import { Input, Item } from 'native-base';
import React, { PropsWithChildren } from 'react';

import { Button } from 'react-native-paper';
import { ScrollView, TextInput } from 'react-native';

export interface SignupFormProps {
  navigation?: any;
  showGroups?: boolean;
  items?: any[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SignupForm: React.FC<SignupFormProps> = (props: PropsWithChildren<any>) => {
  return (
    <ScrollView>
      <TextInput
        value=""
        placeholder="E-mail Address*"
        dense
        mode={'outlined'}
        textAlign={'left'}
        label={'Title'}
        value={title}
        error={titleValidator(title)}
        onChangeText={(text) => onTitleChange(text)}
        disabled={isReadOnly}
        style={{ marginBottom: 10 }}
      />
      <Item regular style={{ marginBottom: 10 }}>
        <Input value="" placeholder="First Name*" />
      </Item>
      <Item regular style={{ marginBottom: 10 }}>
        <Input value="" placeholder="Last Name*" />
      </Item>
      <Item regular style={{ marginBottom: 10 }}>
        <Input value="" placeholder="Mobile Phone (SMS)" />
      </Item>
      <Button
        dark
        mode={'contained'}
        style={{ marginTop: 10 }}
        // onPress={() => onLogin({ username, password })}
        // disabled={validateUsername(username) || validatePassword(password)}
      >
        Sign Up
      </Button>
    </ScrollView>
  );
};
