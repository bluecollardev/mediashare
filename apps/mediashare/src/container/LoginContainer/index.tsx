import * as React from 'react';
import { Text, Button } from 'native-base';
import Login from '../../screens/Login';

import { Component, useContext, useState } from 'react';
import { UserContext } from '../../state/user-context';
import { LoginDto } from '../../api';

import { useDispatch } from 'react-redux';
import { Authenticator } from 'aws-amplify-react-native';

import { AmplifyTheme } from 'aws-amplify-react-native';

// const MySectionHeader = Object.assign({}, AmplifyTheme.button, { backgroundColor: 'black' });

const MyTheme = Object.assign({}, AmplifyTheme, {
  button: {
    backgroundColor: '#2874F0',
    fontFamily: 'System',

    paddingVertical: 6,
    // paddingHorizontal: variables.buttonPadding + 10,
    borderRadius: 5,
    borderColor: '#2874F0',
    borderWidth: null,
    height: 45,
    elevation: 2,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
    width: '100%',
  },
});

const maxLength = (max: any) => (value: any) => value && value.length > max ? `Must be ${max} characters or less` : undefined;
const minLength = (min: any) => (value: any) => value && value.length < min ? `Must be ${min} characters or more` : undefined;
const email = (value: any) => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined);

export interface LoginFormState {}

const LoginComponent = () => {
  const [] = useState('test@example.com');
  const [] = useState('string12345');
  const dispatch = useDispatch();

  const signUpConfig = {
    header: 'My Customized Sign Up',
    hideAllDefaults: true,
    defaultCountryCode: '1',
    signUpFields: [
      {
        label: 'My user name',
        key: 'username',
        required: true,
        displayOrder: 1,
        type: 'string',
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 2,
        type: 'password',
      },
    ],
  };
  return (
    <Login>
      {/* <Item error={validateUsername(username) && username.length > 0}>
        <Input onChange={(e) => setUsername(e.nativeEvent.text)} value={username} placeholder="Username" />
      </Item>
      <Item error={validatePassword(password)}>
        <Input onChange={(e) => setPassword(e.nativeEvent.text)} value={password} placeholder="Password" secureTextEntry={true} />
      </Item> */}
      <Authenticator signUpConfig={signUpConfig} theme={MyTheme}>
        {/* <MyCustomSignUp override={'SignUp'} /> */}
      </Authenticator>
      {/* <View padder>
        <Button block onPress={() => onLogin({ username, password })}>
          <Text>Login</Text>
        </Button>
      </View> */}
    </Login>
  );
};
export default LoginComponent;
