import { View, Button, Icon, Text } from 'native-base';
import React from 'react';

interface Props {
  actionLabel?: string;
  cancelLabel?: string;
  actionCb: () => void;
  cancelCb: () => void;
  disableAction?: boolean;
  disableCancel?: boolean;
}

export const ActionButtons = ({ cancelCb, actionCb, actionLabel = 'Next', cancelLabel = 'Back', disableAction = false, disableCancel = false }: Props) => {
  return (
    <View padder style={{ flexDirection: 'row' }}>
      <Button
        iconLeft
        bordered
        danger
        onPress={() => cancelCb()}
        style={{
          flex: 1,
          marginRight: 10,
          justifyContent: 'center',
        }}
        disabled={disableCancel}
      >
        <Icon name="close-outline" />
        <Text style={{ paddingRight: 30 }}>{cancelLabel}</Text>
      </Button>
      <Button
        iconLeft
        bordered
        success
        onPress={() => actionCb()}
        disabled={disableAction}
        style={{
          flex: 1,
          marginRight: 10,
          justifyContent: 'center',
        }}
      >
        <Icon name="checkmark" />
        <Text style={{ paddingRight: 30 }}>{actionLabel}</Text>
      </Button>
    </View>
  );
};
