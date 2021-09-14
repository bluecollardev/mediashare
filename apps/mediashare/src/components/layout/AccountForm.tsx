import React, { PropsWithChildren } from 'react';

import { Input, Item } from 'native-base';
import { ActionButtons } from './ActionButtons';
import { View } from 'react-native';

export interface AccountFormProps {
  navigation?: any;
  showGroups?: boolean;
  items?: any[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AccountForm: React.FC<AccountFormProps> = (props: PropsWithChildren<any>) => {
  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';

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
      <View>
        <ActionButtons rightIcon="check-circle" actionLabel={actionLabel} cancelLabel={cancelLabel} actionCb={() => {}} cancelCb={() => {}} />
      </View>
    </>
  );
};
