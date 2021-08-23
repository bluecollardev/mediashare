import * as React from 'react';
import { Item, Input, Text, Button, View } from 'native-base';
import Login from '../../screens/Login';

import { Dispatch, useContext, useState } from 'react';
import { UserContext } from '../../state/user-context';
import { LoginDto } from '../../api';
import { apis, ApiService } from '../../state/apis';
import { DefaultApi, MediaItemsApi, PlaylistsApi, servers, ShareItemsApi, UserApi, UsersApi } from '../../rxjs-api';
import { Configuration } from '../../rxjs-api/runtime';
import { ApiContext } from '../../state/api-context';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../state';
import { loginThunk, UserActions } from '../../state/modules/user';

const required = (value: any) => (value ? undefined : 'Required');
const maxLength = (max: any) => (value: any) => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const maxLength15 = maxLength(15);
const minLength = (min: any) => (value: any) => (value && value.length < min ? `Must be ${min} characters or more` : undefined);
const minLength8 = minLength(8);
const email = (value: any) => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined);
const alphaNumeric = (value: any) => (value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined);

export interface LoginFormState {}

function validateUsername(username: string) {
  return email(username) && username.length > 0;
}
function validatePassword(password: string) {
  return email(password) && password.length > 0;
}

const LoginComponent = () => {
  const [username, setUsername] = useState('test@example.com');
  const [password, setPassword] = useState('string12345');
  const user = useContext(UserContext);
  const dispatch = useDispatch();

  const onLogin = async (loginDto: LoginDto) => {
    // const login = await apis.user.userControllerLogin({ loginDto }).toPromise();
    dispatch(loginThunk(loginDto));
    // user.setUser(login);
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
