import React, { PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export interface SignupFormProps {
  navigation?: any;
  showGroups?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SignupForm: React.FC<SignupFormProps> = (props: PropsWithChildren<any>) => {
  return (
    <ScrollView>
      <View style={{ marginBottom: 10 }}>
        <TextInput value="" placeholder="First Name*" />
      </View>
      <View style={{ marginBottom: 10 }}>
        <TextInput value="" placeholder="Last Name*" />
      </View>
      <View style={{ marginBottom: 10 }}>
        <TextInput value="" placeholder="Mobile Phone (SMS)" />
      </View>
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
