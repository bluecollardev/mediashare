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
      {/* <Header style={{ height: 200 }}>
        <Body style={{ alignItems: 'center' }}> */}
      <Card>
        <Card.Cover resizeMode={'contain'} source={require('./logo.png')} />
        {/* <Image
            source={require('./logo.png')}
            style={{
              width: '75%',
              height: 100,
              resizeMode: 'contain',
            }}
          /> */}
      </Card>
      {/* <View padder>
            <Text style={{ color: Platform.OS === 'ios' ? '#000' : '#FFF' }} />
          </View>
        </Body> */}
      {/* </Header> */}
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
    <View padder>
      <Card elevation={0}>
        <Card.Cover style={{ backgroundColor: '#fff' }} resizeMode={'contain'} source={require('./logo.png')} />
        {/* <Image
            source={require('./logo.png')}
            style={{
              width: '75%',
              height: 100,
              resizeMode: 'contain',
            }}
          /> */}
      </Card>
      <Card elevation={0}>
        <Card.Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
          <TextInput
            mode="outlined"
            dense
            error={validateUsername(username)}
            label="Username"
            value={username}
            style={{ marginTop: 10 }}
            onChange={(e) => setUsername(e.nativeEvent.text)}
          />

          <TextInput
            dense
            mode="outlined"
            error={validatePassword(password)}
            label="Password"
            secureTextEntry={true}
            value={password}
            style={{ marginTop: 10 }}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
          <Button
            dark
            mode={'contained'}
            style={{ marginTop: 10 }}
            onPress={() => onLogin({ username, password })}
            disabled={validateUsername(username) || validatePassword(password)}
          >
            Login
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default LoginComponent;
