import { Input, Item } from 'native-base';
import React, { PropsWithChildren } from 'react';

import { Button, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { UserDto } from '../../rxjs-api/models/UserDto';

export interface SignupFormProps {
  navigation?: any;
  showGroups?: boolean;
  items?: any[];
  user: UserDto;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SignupForm: React.FC<SignupFormProps> = (props: PropsWithChildren<any>) => {
  return (
    <ScrollView>
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
