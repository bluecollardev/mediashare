import * as React from 'react';
import { Item, Input, Form } from 'native-base';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import Login from '../../screens/Login';
import { UserApi } from '../../api';

const required = (value: any) => (value ? undefined : 'Required');
const maxLength = (max: any) => (value: any) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = (min: any) => (value: any) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const email = (value: any) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
const alphaNumeric = (value: any) =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined;

export interface LoginFormProps extends InjectedFormProps {
  navigation?: any;
  valid: boolean;
}
export interface LoginFormState {}
class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  navigation: any;
  textInput: any;
  userApi = new UserApi();

  renderInput({ input, meta: { touched, error } }) {
    // <Icon active name={input.name === 'email' ? 'person' : 'unlock'} />
    return (
      <Item error={error && touched}>
        <Input
          ref={(c) => (this.textInput = c)}
          placeholder={input.name === 'email' ? 'Email' : 'Password'}
          secureTextEntry={input.name === 'password' ? true : false}
          {...input}
        />
      </Item>
    );
  }

  login() {
    this.props.navigation.navigate('Explore');
  }

  render() {
    const form = (
      <Form>
        <Field name="email" component={this.renderInput} validate={[email, required]} />
        <Field
          name="password"
          component={this.renderInput}
          validate={[alphaNumeric, minLength8, maxLength15, required]}
        />
      </Form>
    );
    return <Login loginForm={form} onLogin={() => this.login()} />;
  }
}
const LoginContainer = reduxForm({
  form: 'login',
})(LoginForm);
export default LoginContainer;
