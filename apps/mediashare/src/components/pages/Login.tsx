import React, { Component, useState } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginAction } from 'mediashare/store/modules/user';
import { RootState } from 'mediashare/store';
import { Authenticator, SignIn, SignUp, Greetings, VerifyContact, ForgotPassword, AmplifyTheme, ConfirmSignIn } from 'aws-amplify-react-native';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { Button, Card } from 'react-native-paper';
import { PageContainer, PageProps, KeyboardAvoidingPageContent } from 'mediashare/components/layout/PageContainer';
import { theme } from 'mediashare/styles';

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

// https://github.com/aws-amplify/amplify-js/blob/main/packages/aws-amplify-react-native/src/AmplifyTheme.ts
const MyTheme = Object.assign({}, AmplifyTheme, {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
    width: '100%',
    backgroundColor: theme.colors.background,
  },
  section: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  sectionScroll: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  sectionHeader: {
    width: '100%',
    marginBottom: 32,
    paddingTop: 20,
  },
  sectionHeaderText: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: '500',
  },
  sectionFooter: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20,
  },
  sectionFooterLink: {
    fontSize: 15,
    color: theme.colors.textDarker,
    alignItems: 'baseline',
    textAlign: 'center',
  },
  sectionFooterLinkDisabled: {
    fontSize: 15,
    color: theme.colors.textDarker,
    alignItems: 'baseline',
    textAlign: 'center',
  },
  navBar: {
    marginTop: 35,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  navButton: {
    marginLeft: 12,
    borderRadius: 4,
  },
  cell: {
    flex: 1,
    width: '50%',
  },
  errorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    color: theme.colors.error,
  },
  errorRowIcon: {
    height: 25,
    width: 25,
    color: theme.colors.error,
  },
  errorRowText: {
    marginLeft: 10,
    color: theme.colors.error,
  },
  photo: {
    width: '100%',
  },
  album: {
    width: '100%',
  },
  button: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    padding: 16,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.disabled,
    alignItems: 'center',
    padding: 16,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  formField: {
    marginBottom: 22,
  },
  input: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.colors.default,
    color: theme.colors.text,
  },
  inputLabel: {
    marginBottom: 8,
    color: theme.colors.textDarker,
  },
  phoneContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    flex: 2,
    padding: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.colors.default,
    color: theme.colors.text,
  },
  picker: {
    flex: 1,
    height: 44,
    // ensure that longer text values render without truncation
    // as the selected value of the Picker on Android
  },
  pickerItem: {
    height: 44,
  },
  signedOutMessage: {
    textAlign: 'center',
    padding: 20,
    color: theme.colors.text,
  },
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
        <ScrollView>
          <Card elevation={0}>
            <Card.Cover
              resizeMode="contain"
              source={require('mediashare/assets/logo/mediashare/256.png')}
              style={{ backgroundColor: theme.colors.background }}
            />
          </Card>
          {show && (
            <Authenticator theme={MyTheme} onStateChange={(authState, data) => updateAuthState(authState, data)} hideDefault={false}>
              {/* <MyCustomSignUp override={'SignUp'} /> */}
              {/* <SignIn />
              <SignUp />
              <Greetings />
              <ConfirmSignIn />
              <VerifyContact />
              <ForgotPassword /> */}
              {/* <TOTPSetup /> */}
              {/* <Loading /> */}
              {/* <CustomVerify override="ConfirmSignUp" /> */}
            </Authenticator>
          )}
        </ScrollView>
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

export default withLoadingSpinner(undefined)(LoginComponent);
