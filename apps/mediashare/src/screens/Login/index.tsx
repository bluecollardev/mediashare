import * as React from 'react';
import { Platform } from 'react-native';
import { Container, Content, Header, Body, Title, Button, Text, View } from 'native-base';
import { RootState } from '../../state';

export interface LoginProps {
  loginForm: any;

  onLogin: any;
}

export interface LoginState extends Pick<RootState, never> {}

const Login = ({ children }) => {
  // <Icon name="flash" style={{ fontSize: 104 }} />

  return (
    <Container>
      <Header style={{ height: 200 }}>
        <Body style={{ alignItems: 'center' }}>
          <Title>Blue Collar Software</Title>
          <View padder>
            <Text style={{ color: Platform.OS === 'ios' ? '#000' : '#FFF' }} />
          </View>
        </Body>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

export default Login;
