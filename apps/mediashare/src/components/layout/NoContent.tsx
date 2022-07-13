import { NoItems } from 'mediashare/components/layout/NoItems';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { TouchableWithoutFeedback, View } from 'react-native';
import { theme } from 'mediashare/styles';

interface NoDataProps {
  onPress?: () => void;
  messageButtonText?: string;
  icon?: string;
}

export const NoContent = ({ onPress, messageButtonText = `Please create a new record to continue`, icon = 'info' }: NoDataProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          height: 450,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <IconButton icon={icon} size={64} iconColor={theme.colors.primary} />
        <NoItems text={messageButtonText} />
      </View>
    </TouchableWithoutFeedback>
  );
};
