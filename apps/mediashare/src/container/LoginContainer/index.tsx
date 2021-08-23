import * as React from 'react';
import { Text, Button, Container, View, Segment, Content } from 'native-base';
import Login from '../../screens/Login';

import { Component, useContext, useState } from 'react';

import {
  Authenticator,
  SignIn,
  SignUp,
  Greetings,
  VerifyContact,
  ForgotPassword,
  TOTPSetup,
  Loading,
  AmplifyTheme,
  ConfirmSignIn,
} from 'aws-amplify-react-native';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { UserActions } from '../../state/modules/user';
import { createUser } from '../../state/modules/users';

const sectionFooterLink = Object.assign({}, AmplifyTheme.sectionFooterLink, { color: '#2874F0', fontFamily: 'System' });

const sectionFooterLinkDisabled = Object.assign({}, AmplifyTheme.sectionFooterLinkDisabled, { color: '#b5b5b5', fontFamily: 'System' });

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
  buttonDisabled: {
    backgroundColor: '#b5b5b5',
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
  sectionFooterLink,
  sectionFooterLinkDisabled,
});

const maxLength = (max: any) => (value: any) => value && value.length > max ? `Must be ${max} characters or less` : undefined;
const minLength = (min: any) => (value: any) => value && value.length < min ? `Must be ${min} characters or more` : undefined;
const email = (value: any) => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined);

export interface LoginFormState {}

const LoginComponent = () => {
  // const [username] = useState('test@example.com');
  // const [password] = useState('string12345');
  const dispatch = useDispatch();
  function updateAuthState(authState, data) {
    console.log(authState);
    console.log(data);

    if (authState === 'signedIn') {
      dispatch(UserActions.login({ ...data, username: data.username }));

      console.log(Auth.Credentials);
      // const combined = Object.create({}, { ...attributes, username });
      dispatch(createUser(data.username));
    }
  }
  return (
    <Login>
      <Authenticator theme={MyTheme} onStateChange={(authState, data) => updateAuthState(authState, data)} hideDefault={true}>
        {/* <MyCustomSignUp override={'SignUp'} /> */}
        <SignIn />
        <SignUp />
        <Greetings />
        <ConfirmSignIn />

        <VerifyContact />
        <ForgotPassword />
        {/* <TOTPSetup /> */}
        <Loading />
        <CustomVerify override={'ConfirmSignUp'} />
      </Authenticator>
    </Login>
  );
};

class CustomVerify extends Component<any> {
  constructor(props: any) {
    super(props);
    this.gotoSignIn = this.gotoSignIn.bind(this);
  }

  gotoSignIn() {
    // to switch the authState to 'signIn'
    this.props.onStateChange('signIn', {});
  }

  render() {
    return (
      <>
        {/* only render this component when the authState is 'signUp' */}
        {this.props.authState === 'confirmSignUp' && (
          <Container style={{ width: '100%' }}>
            <Content>
              <View padder>
                {/* <Text>My Custom SignUp Component</Text> */}

                <Button onPress={this.gotoSignIn} style={{ width: '100%' }} block>
                  <Text>Goto SignIn</Text>
                </Button>
              </View>
            </Content>
          </Container>
        )}
      </>
    );
  }
}
export default LoginComponent;
