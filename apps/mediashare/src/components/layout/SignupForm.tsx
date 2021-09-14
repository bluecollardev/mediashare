import React, { PropsWithChildren } from 'react';

import { Input, Item } from 'native-base';
import { Button } from 'react-native-paper';

export interface SignupFormProps {
  navigation?: any;
  showGroups?: boolean;
  items?: any[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SignupForm: React.FC<SignupFormProps> = (props: PropsWithChildren<any>) => {
  return (
    <>
      <Item regular style={{ marginBottom: 10 }}>
        <Input value="" placeholder="E-mail Address*" />
      </Item>
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
    </>
  );
};
