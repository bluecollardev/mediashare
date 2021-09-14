import React, { PropsWithChildren } from 'react';

import { Input, Item } from 'native-base';
import { Button } from 'react-native-paper';

export interface ResetPasswordFormProps {
  navigation?: any;
  items?: any[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = (props: PropsWithChildren<any>) => {
  return (
    <>
      <Item regular style={{ marginBottom: 10 }}>
        <Input value="" placeholder="Password" />
      </Item>
      <Item regular style={{ marginBottom: 10 }}>
        <Input value="" placeholder="Confirm Password" />
      </Item>
      <Button
        dark
        mode={'contained'}
        style={{ marginTop: 10 }}
      >
        Confirm
      </Button>
    </>
  );
};
