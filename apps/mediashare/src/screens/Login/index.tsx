import * as React from 'react';
import { Platform } from 'react-native';
import {
  Container,
  Content,
  Header,
  Body,
  Title,
  Button,
  Text,
  View
} from 'native-base';

export interface LoginProps {
  loginForm: any;
  onLogin: Function;
}

export interface LoginState {}

class Login extends React.Component<LoginProps, LoginState> {
  // <Icon name="flash" style={{ fontSize: 104 }} />
  render() {
    return (
      <Container>
        <Header style={{ height: 200 }}>
          <Body style={{ alignItems: 'center' }}>
            <Title>Blue Collar Software</Title>
            <View padder>
              <Text
                style={{ color: Platform.OS === 'ios' ? '#000' : '#FFF' }}
              />
            </View>
          </Body>
        </Header>
        <Content>
          {this.props.loginForm}
          <View padder>
            <Button block onPress={() => this.props.onLogin()}>
              <Text>Login</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Login;
