import React from 'react';
import { Text, Button, Input, Item, View, Container, Header, Body, Content, Card, CardItem } from 'native-base';
import { Image, Platform } from 'react-native';

import { useState } from 'react';
import { LoginDto } from '../../../api';

import { useDispatch } from 'react-redux';

import { loginAction } from '../../../state/modules/user';
import { RootState } from '../../../state';

export const maxLength = (max: any) => (value: any) => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
export const minLength = (min: any) => (value: any) => (value && value.length < min ? `Must be ${min} characters or more` : undefined);
export const email = (value: any) => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined);

function validateUsername(username: string) {
  return email(username) && username.length > 0;
}
function validatePassword(password: string) {
  return email(password) && password.length > 0;
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
              resizeMode: "contain",
            }}
          />

          <View padder>
            <Text style={{ color: Platform.OS === 'ios' ? '#000' : '#FFF' }} />
          </View>
        </Body>
      </Header>
      <Content>{children}</Content>
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
        <Card style={{ margin: 30, paddingBottom: 30 }}>
          <CardItem>
            <Body>
              <Item error={validateUsername(username) && username.length > 0}>
                <Input onChange={(e) => setUsername(e.nativeEvent.text)} value={username} placeholder="Username" />
              </Item>
              <Item error={validatePassword(password)}>
                <Input onChange={(e) => setPassword(e.nativeEvent.text)} value={password} placeholder="Password" secureTextEntry={true} />
              </Item>
              <Button block onPress={() => onLogin({ username, password })}>
                <Text>Login</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </View>
    </Login>
  );
};

export default LoginComponent;
