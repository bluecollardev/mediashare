import * as React from 'react';
import { Item, Input, Form, Text, Button, View } from 'native-base';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import Login from '../../screens/Login';
import { LoginDto } from '../../api';
import { RootState } from '../../state';
import { UserActions } from '../../state/modules/user';
import { connect } from 'react-redux';
import { useState } from 'react';

const required = (value: any) => (value ? undefined : 'Required');
const maxLength = (max: any) => (value: any) => value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = (min: any) => (value: any) => value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const email = (value: any) => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined);
const alphaNumeric = (value: any) => (value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined);

export interface LoginFormProps extends InjectedFormProps {
  navigation?: any;
  valid: boolean;
  loginForm: LoginDto;
  isLoading: boolean;
  login: (dto: LoginDto) => void;
}
export interface LoginFormState {}

const LoginInput = ({ name }: { name: string }) => {
  console.log('🚀 --------------------------------------------------------');
  console.log('🚀 ~ file: index.tsx ~ line 29 ~ LoginInput ~ name', name);
  console.log('🚀 --------------------------------------------------------');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  return (
    <Item error={error && touched}>
      <Input placeholder={name === 'username' ? 'Email' : 'Password'} secureTextEntry={name === 'password' ? true : false} />
    </Item>
  );
};

const LoginComponent: React.FC<{}> = (props = {}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onLogin = ({ username, password }: { username: string; password: string }) => {
    console.log(username, password);
  };

  return (
    <Login>
      <Form>
        <Field name="username" component={LoginInput} validate={[email, required]} value={username} />
        <Field name="password" component={LoginInput} validate={[alphaNumeric, minLength8, maxLength15, required]} value={password} />
      </Form>
      <View padder>
        <Button block onPress={() => onLogin({ username, password })}>
          <Text>Login</Text>
        </Button>
      </View>
    </Login>
  );
};
const LoginContainer = reduxForm({
  form: 'login',
  initialValues: {},
})(LoginComponent);
// class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
//   navigation: any;
//   textInput: any;
//   username: string;
//   password: string;

//   componentDidMount() {
//     console.log('did mount', this.props);
//   }

//   renderInput({ input, meta: { touched, error } }) {
//     console.log('🚀 -----------------------------------------------------------------------');
//     console.log('🚀 ~ file: index.tsx ~ line 35 ~ LoginForm ~ renderInput ~ input', input);
//     console.log('🚀 -----------------------------------------------------------------------');
//     // <Icon active name={input.name === 'email' ? 'person' : 'unlock'} />
//     return (
//       <Item error={error && touched}>
//         <Input
//           ref={(c) => (this.textInput = c)}
//           placeholder={input.name === 'username' ? 'Email' : 'Password'}
//           secureTextEntry={input.name === 'password' ? true : false}
//           {...input}
//         />
//       </Item>
//     );
//   }

//   render() {
//     const form = (
//       <Form>
//         <Field name="username" component={this.renderInput} validate={[email, required]} value={this.username} />
//         <Field name="password" component={this.renderInput} validate={[alphaNumeric, minLength8, maxLength15, required]} value={this.password} />
//       </Form>
//     );
//     return <Login loginForm={form} onLogin={this.props.login} />;
//   }
// }

// const mapStateToProps = (state: RootState) => {
//   console.log('map state props', JSON.stringify(state));
//   return {
//     // loginForm: state?.forms?.loginForm,
//     // isLoading: state?.isLoading,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // login: (loginDto: LoginDto) => dispatch(UserActions.login(loginDto)),
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     login: (loginDto: LoginDto) => dispatch(UserActions.login()),
//   };
// };

// const LoginContainer = reduxForm({
//   form: 'login',
//   initialValues: {},
// })(LoginForm);

// export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

export default LoginContainer;
