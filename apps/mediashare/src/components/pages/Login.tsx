import React, { Component, useState } from 'react';
import { useDispatch } from 'react-redux';

import { loginAction } from '../../state/modules/user';
import { RootState } from '../../state';

import { Authenticator, SignIn, SignUp, Greetings, VerifyContact, ForgotPassword, AmplifyTheme, ConfirmSignIn } from 'aws-amplify-react-native';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { PageContainer, PageProps, KeyboardAvoidingPageContent } from '../layout/PageContainer';

import { theme } from '../../styles';

export const maxLength = (max: any) => (value: any) => value?.length > max;
export const minLength = (min: any) => (value: any) => value?.length < min;
export const email = (value: any) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

export interface LoginProps {
  loginForm: any;
  onLogin: any;
}
const sectionFooterLink = Object.assign({}, AmplifyTheme.sectionFooterLink, { color: theme.colors.primary, fontFamily: theme.fonts.medium.fontFamily });

const sectionFooterLinkDisabled = Object.assign({}, AmplifyTheme.sectionFooterLinkDisabled, {
  color: theme.colors.disabled,
  fontFamily: theme.fonts.medium.fontFamily,
});
const MyTheme = Object.assign({}, AmplifyTheme, {
  button: {
    backgroundColor: theme.colors.primary,
    fontFamily: theme.fonts.medium.fontFamily,

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
    backgroundColor: theme.colors.disabled,
    fontFamily: theme.fonts.medium.fontFamily,

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
export interface LoginState extends Pick<RootState, never> {}

const LoginComponent = ({}: PageProps) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(true);

  function updateAuthState(authState, data) {
    if (authState === 'signedIn') {
      setShow(false);
      const accessToken = data.signInUserSession.accessToken.jwtToken;

      const idToken = data.signInUserSession.idToken.jwtToken;
      // const refreshToken = data.signInUserSession.refreshToken.token;
      dispatch(loginAction({ accessToken, idToken }));
    }
  }

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
        <Card elevation={0}>
          <Card.Cover style={{ backgroundColor: '#fff' }} resizeMode={'contain'} source={require('./logo.png')} />
        </Card>
        {show && (
          <Authenticator theme={MyTheme} onStateChange={(authState, data) => updateAuthState(authState, data)} hideDefault={true}>
            {/* <MyCustomSignUp override={'SignUp'} /> */}
            <SignIn />
            <SignUp />
            <Greetings />
            <ConfirmSignIn />

            <VerifyContact />
            <ForgotPassword />
            {/* <TOTPSetup /> */}
            {/* <Loading /> */}
            <CustomVerify override={'ConfirmSignUp'} />
          </Authenticator>
        )}
      </KeyboardAvoidingPageContent>
    </PageContainer>
  );
};

class CustomVerify extends Component<any> {
  constructor(props: any) {
    super(props);
    this.gotoSignIn = this.gotoSignIn.bind(this);
  }

  gotoSignIn() {
    const { onStateChange } = this.props;
    onStateChange('signIn', {});
  }

  render() {
    const { authState } = this.props;
    return authState === 'confirmSignUp' ? (
      <Button onPress={this.gotoSignIn} style={{ width: '100%' }} mode="outlined">
        Go to Sign In
      </Button>
    ) : null;
  }
}

export default withLoadingSpinner(LoginComponent);
