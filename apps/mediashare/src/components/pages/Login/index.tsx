import React from 'react';
import { Text, View, Container, Header, Body } from 'native-base';
import { Card, Button, TextInput } from 'react-native-paper';
import { Image, Platform } from 'react-native';

import { useState } from 'react';
import { LoginDto } from '../../../api';

import { useDispatch } from 'react-redux';

import { loginAction } from '../../../state/modules/user';
import { RootState } from '../../../state';

export const maxLength = (max: any) => (value: any) => value?.length > max;
export const minLength = (min: any) => (value: any) => value?.length < min;
export const email = (value: any) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

function validateUsername(username: string) {
  return email(username) && username.length > 0;
}
function validatePassword(password: string) {
  if (password.length < 1) {
    console.log('valid');
    return true;
  }
  return minLength(6)(password) || maxLength(15)(password);
}

export interface LoginProps {
  loginForm: any;

  onLogin: any;
}

export interface LoginState extends Pick<RootState, never> {}

export const Login = ({ children }) => {
  // <Icon name="flash" style={{ fontSize: 104 }} />

  return (
    <Container>
      <Header style={{ height: 200 }}>
        <Body style={{ alignItems: 'center' }}>
          <Image
            source={require('./logo.png')}
            style={{
              width: '75%',
              height: 100,
              resizeMode: 'contain',
            }}
          />

          <View padder>
            <Text style={{ color: Platform.OS === 'ios' ? '#000' : '#FFF' }} />
          </View>
        </Body>
      </Header>
      {children}
    </Container>
  );
};

const LoginComponent = () => {
  const [username, setUsername] = useState('test@example.com');
  const [password, setPassword] = useState('string12345');
  const dispatch = useDispatch();

  const onLogin = async (loginDto: LoginDto) => {
    dispatch(loginAction(loginDto));
  };
  return (
    <Login>
      <View padder>
        <Card elevation={0}>
          {/* <Item error={validateUsername(username) && username.length > 0}>
            <Input onChange={(e) => setUsername(e.nativeEvent.text)} value={username} placeholder="Username" />
          </Item>
          <Item error={validatePassword(password)}>
            <Input onChange={(e) => setPassword(e.nativeEvent.text)} value={password} placeholder="Password" secureTextEntry={true} />
          </Item> */}
          <Card.Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <TextInput mode="outlined" dense error={validateUsername(username)} label="Username" onChange={(e) => setUsername(e.nativeEvent.text)} />

            <TextInput
              dense
              mode="outlined"
              error={validatePassword(password)}
              label="Password"
              secureTextEntry={true}
              onChange={(e) => setPassword(e.nativeEvent.text)}
            />
          </Card.Content>
        </Card>
        <Button dark mode={'contained'} onPress={() => onLogin({ username, password })}>
          Login
        </Button>
      </View>
    </Login>
  );
};

export default LoginComponent;
