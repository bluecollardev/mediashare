import React from 'react';
import { View, Button, Icon, Text } from 'native-base';

export interface TopActionButtonsProps {
  leftLabel: string;
  rightLabel: string;
  leftAction: () => void;
  rightAction: () => void;
}

export const TopActionButtons = ({ leftAction, rightAction, leftLabel, rightLabel }: TopActionButtonsProps) => {
  return (
    <View padder style={{ flexDirection: 'row' }}>
      {/* <Button
        iconLeft
        bordered
        dark
        style={{ flex: 1, marginRight: 10 }}
        onPress={() => leftAction()} />

      <Icon name="add-outline" />
      <Text style={{ paddingRight: 30 }}>{leftLabel}</Text>
    </Button> */}
      <Button iconLeft style={{ flex: 1, marginRight: 10 }} onPress={() => leftAction()}>
        <Icon name="add-outline" />
        <Text style={{ paddingRight: 30 }}>{leftLabel}</Text>
      </Button>
      <Button success iconLeft style={{ flex: 1 }}>
        <Icon name="add-outline" />
        <Text style={{ paddingRight: 30 }} onPress={() => rightAction()}>
          {rightLabel}
        </Text>
      </Button>
    </View>
  );
};
