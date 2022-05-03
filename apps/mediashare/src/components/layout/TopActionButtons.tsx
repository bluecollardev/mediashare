import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { theme } from 'mediashare/styles';

export interface TopActionButtonsProps {
  leftLabel: string;
  rightLabel: string;
  leftAction: () => void;
  rightAction: () => void;
  rightIcon?: string;
  leftIcon?: string;
}

export const TopActionButtons = ({ leftAction, rightAction, leftLabel, rightLabel, rightIcon = 'add-box', leftIcon = 'add-box' }: TopActionButtonsProps) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Button mode="text" color={theme.colors.primary} dark style={{ flex: 1, marginRight: 10 }} icon={leftIcon} onPress={() => leftAction()}>
        {leftLabel}
      </Button>
      <Button mode="text" icon={rightIcon} dark color={theme.colors.primary} style={{ flex: 1 }} onPress={() => rightAction()}>
        {rightLabel}
      </Button>
    </View>
  );
};
