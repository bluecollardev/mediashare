import React from 'react';
import { PropsWithChildren } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '../form/TextField';

export interface AccountFormProps {
  navigation?: any;
  showGroups?: boolean;
  items?: any[];
}

export const AccountFormLayout: React.FC<AccountFormProps> = (
  props: PropsWithChildren<any>
) => {
  const {} = props;
  return (
    <>
      <Field name="firstname" label="First Name" component={TextField} />
      <Field name="lastname" label="Last Name" component={TextField} />
      <Field name="email" label="E-mail Address" component={TextField} />
      <Field name="mobile" label="Mobile Phone (SMS)" component={TextField} />
    </>
  );
};

export const AccountForm = reduxForm<{}, AccountFormProps>({
  form: 'accountEdit',
})(AccountFormLayout as any);
