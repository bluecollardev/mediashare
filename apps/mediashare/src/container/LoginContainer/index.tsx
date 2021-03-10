import * as React from 'react';
import { Item, Input, Form } from 'native-base';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import Login from '../../screens/Login';
import { LoginDto, UserApi } from '../../api';
import { RootState } from '../../state';
import { RootActions, RootActionsType } from '../../state/root-actions';
import { connect } from 'react-redux';

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
  loginForm: LoginDto;
  isLoading: boolean;
  login: (dto: LoginDto) => void;
}
export interface LoginFormState extends Pick<RootState, 'loginDto' | 'forms'> {}
class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  navigation: any;
  textInput: any;

  componentDidMount() {
    console.log('did mount', this.props);
  }

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

  render() {
    const form = (
      <Form>
        <Field name="username" component={this.renderInput} validate={[email, required]} />
        <Field
          name="password"
          component={this.renderInput}
          validate={[alphaNumeric, minLength8, maxLength15, required]}
        />
      </Form>
    );
    return <Login loginForm={form} onLogin={this.props.login} />;
  }
}

const mapStateToProps = (state: RootState) => {
  console.log('map state props', state);
  return {
    loginForm: state?.loginDto,
    isLoading: state?.isLoading,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    login: (loginDto: LoginDto) => dispatch({ type: RootActions.LOGIN_DTO, loginDto }),
    dtoChange: (loginDto: LoginDto) => dispatch({ type: RootActions.LOGIN_DTO, loginDto }),
    // fetchList: (url) => console.log(url),
  };
}

const LoginContainer = reduxForm({
  form: 'login',
  initialValues: {},
})(LoginForm);

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
