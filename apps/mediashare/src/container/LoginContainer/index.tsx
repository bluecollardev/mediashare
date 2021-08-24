import * as React from 'react';
import { Text, Button, Input, Item, View } from 'native-base';
import Login from '../../screens/Login';

import { useState } from 'react';
import { LoginDto } from '../../api';

import { useDispatch } from 'react-redux';

import { loginAction } from '../../state/modules/user';

const maxLength = (max: any) => (value: any) => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const minLength = (min: any) => (value: any) => (value && value.length < min ? `Must be ${min} characters or more` : undefined);
const email = (value: any) => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined);

function validateUsername(username: string) {
  return email(username) && username.length > 0;
}
function validatePassword(password: string) {
  return email(password) && password.length > 0;
}

const LoginComponent = () => {
  const [username, setUsername] = useState('test@example.com');
  const [password, setPassword] = useState('string12345');
  const dispatch = useDispatch();

  const onLogin = async (loginDto: LoginDto) => {
    dispatch(loginAction(loginDto));
  };
  return (
    <Login>
      <Item error={validateUsername(username) && username.length > 0}>
        <Input onChange={(e) => setUsername(e.nativeEvent.text)} value={username} placeholder="Username" />
      </Item>
      <Item error={validatePassword(password)}>
        <Input onChange={(e) => setPassword(e.nativeEvent.text)} value={password} placeholder="Password" secureTextEntry={true} />
      </Item>

      <View padder>
        <Button block onPress={() => onLogin({ username, password })}>
          <Text>Login</Text>
        </Button>
      </View>
    </Login>
  );
};
export default LoginComponent;
