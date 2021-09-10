import React from 'react';
import { View, Icon, Text } from 'native-base';
import { Button } from 'react-native-paper';
import { theme } from '../../styles';

export interface TopActionButtonsProps {
  leftLabel: string;
  rightLabel: string;
  leftAction: () => void;
  rightAction: () => void;
  rightIcon?: string;
  leftIcon?: string;
}

export const TopActionButtons = ({ leftAction, rightAction, leftLabel, rightLabel, rightIcon = 'plus', leftIcon = 'plus' }: TopActionButtonsProps) => {
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
      <Button color={theme.colors.accent} style={{ flex: 1, marginRight: 10 }} icon={leftIcon} onPress={() => leftAction()}>
        {leftLabel}
      </Button>
      <Button icon={rightIcon} color={theme.colors.accent} style={{ flex: 1 }} onPress={() => rightAction()}>
        {rightLabel}
      </Button>
    </View>
  );
};
