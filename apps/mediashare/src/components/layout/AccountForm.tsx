import React from 'react';
import { PropsWithChildren } from 'react';

import { Input, Item } from 'native-base';

import TextField from '../form/TextField';

export interface AccountFormProps {
  navigation?: any;
  showGroups?: boolean;
  items?: any[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AccountForm: React.FC<AccountFormProps> = (props: PropsWithChildren<any>) => {
  return (
    <>
      <Item regular style={{ marginBottom: 10 }}>
        <Input value="" placeholder="First Name" />
      </Item>
      <Item regular style={{ marginBottom: 10 }}>
        <Input value="" placeholder="Last Name" />
      </Item>
      <Item regular style={{ marginBottom: 10 }}>
        <Input value="" placeholder="E-mail Address" />
      </Item>
      <Item regular style={{ marginBottom: 10 }}>
        <Input value="" placeholder="Mobile Phone (SMS)" />
      </Item>
    </>
  );
};
