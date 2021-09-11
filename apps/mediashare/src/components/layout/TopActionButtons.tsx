import React from 'react';
import { View } from 'native-base';
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
      <Button mode={'contained'} color={theme.colors.accent} dark style={{ flex: 1, marginRight: 10 }} icon={leftIcon} onPress={() => leftAction()}>
        {leftLabel}
      </Button>
      <Button mode={'contained'} icon={rightIcon} dark color={theme.colors.accent} style={{ flex: 1 }} onPress={() => rightAction()}>
        {rightLabel}
      </Button>
    </View>
  );
};
