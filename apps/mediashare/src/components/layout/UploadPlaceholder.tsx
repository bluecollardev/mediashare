import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { theme } from '../../styles';

interface UploadPlaceholderProps {
  onPress?: () => void;
  buttonText?: string;
}

export const UploadPlaceholder = ({ onPress, buttonText = 'Upload File' }: UploadPlaceholderProps) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={{
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#dddddd',
        height: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <IconButton icon="cloud-upload" size={64} color={theme.colors.primary} />
      <Button mode="contained" dark color={theme.colors.darkDefault} compact>
        <Text>{buttonText}</Text>
      </Button>
    </View>
  </TouchableWithoutFeedback>
);
