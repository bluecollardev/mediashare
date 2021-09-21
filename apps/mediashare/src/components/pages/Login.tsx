import React, { Component, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { loginAction } from '../../state/modules/user';
import { RootState } from '../../state';

import { LoginDto } from '../../api';

import { useRouteName } from '../../hooks/NavigationHooks';

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

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { Text } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { PageContainer, PageProps, KeyboardAvoidingPageContent } from '../layout/PageContainer';

import Config from 'react-native-config';
import { theme } from '../../styles';

const testUser = Config.TEST_USER;
const testPassword = Config.TEST_PASSWORD;

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
});
export interface LoginState extends Pick<RootState, never> {}

const LoginComponent = ({ navigation }: PageProps) => {
  const dispatch = useDispatch();

  const onSignupClicked = useRouteName(ROUTES.signup);
  const onForgotPasswordClicked = useRouteName(ROUTES.resetPassword);

  const [username, setUsername] = useState(testUser || '');
  const [password, setPassword] = useState(testPassword || '');

  // const [{ startLoad, endLoad, AppSpinner }] = useSpinner({ ...SPINNER_DEFAULTS, loadingState: false });Z
  // TODO: startLoad and endLoad need to be cleaned up in useEffect within the spinner
  const onLogin = async (loginDto: LoginDto) => {
    // startLoad();
    try {
      await dispatch(loginAction(loginDto));
    } catch (err) {
      console.log(err);
    }
    // endLoad();
  };

  function updateAuthState(authState, data) {
    console.log('🚀 ------------------------------------------------------------------------');
    console.log('🚀 ~ file: Login.tsx ~ line 123 ~ updateAuthState ~ authState', authState);
    console.log('🚀 ------------------------------------------------------------------------');
    console.log('🚀 ------------------------------------------------------------------------');
    console.log('🚀 ~ file: Login.tsx ~ line 123 ~ updateAuthState ~ authState', data);
    console.log('🚀 ------------------------------------------------------------------------');
    if (authState === 'signedIn') {
      const accessToken = data.signInUserSession.accessToken.jwtToken;
      console.log('🚀 ----------------------------------------------------------------------------');
      console.log('🚀 ~ file: Login.tsx ~ line 131 ~ updateAuthState ~ accessToken', accessToken);
      console.log('🚀 ----------------------------------------------------------------------------');
      const idToken = data.signInUserSession.idToken.jwtToken;
      console.log('🚀 --------------------------------------------------------------------');
      console.log('🚀 ~ file: Login.tsx ~ line 135 ~ updateAuthState ~ idToken', idToken);
      console.log('🚀 --------------------------------------------------------------------');
      const refreshToken = data.signInUserSession.refreshToken.token;
    }
    if (authState === 'signedIn') {
      // dispatch(createUser(data.attributes.email));
      // dispatch(UserActions.login({ ...data, username: data.attributes.email }));
    }
  }

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
        <Card elevation={0}>
          <Card.Cover style={{ backgroundColor: '#fff' }} resizeMode={'contain'} source={require('./logo.png')} />
        </Card>
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
    // to switch the authState to 'signIn'
    this.props.onStateChange('signIn', {});
  }

  render() {
    return (
      <>
        {/* only render this component when the authState is 'signUp' */}
        {this.props.authState === 'confirmSignUp' && (
          <Button onPress={this.gotoSignIn} style={{ width: '100%' }} mode={'contained'}>
            <Text>Goto SignIn</Text>
          </Button>
        )}
      </>
    );
  }
}

export default withLoadingSpinner(LoginComponent);
