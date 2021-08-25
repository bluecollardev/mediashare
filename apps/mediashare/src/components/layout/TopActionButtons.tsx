import { string } from '@hapi/joi';
import { View, Button, Icon, Text } from 'native-base';
import React from 'react';
import { routeConfig } from '../../routes';

export interface TopActionButtonsProps {
  leftLabel: string;
  rightLabel: string;
  leftAction: () => void;
  rightAction: () => void;
}

const TopActionButtons = ({ leftAction, rightAction, leftLabel, rightLabel }: TopActionButtonsProps) => {
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
      <Button iconLeft bordered dark style={{ flex: 1, marginRight: 10 }} onPress={() => leftAction()}>
        <Icon name="add-outline" />
        <Text style={{ paddingRight: 30 }}>{leftLabel}</Text>
      </Button>
      <Button iconLeft bordered dark style={{ flex: 1 }}>
        <Icon name="add-outline" />
        <Text style={{ paddingRight: 30 }} onPress={() => rightAction()}>
          {rightLabel}
        </Text>
      </Button>
    </View>
  );
};

export default TopActionButtons;
