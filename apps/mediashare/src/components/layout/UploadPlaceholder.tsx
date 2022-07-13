import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { theme } from 'mediashare/styles';

interface UploadPlaceholderProps {
  onPress?: () => void;
  buttonText?: string;
  uploadText?: string;
  uploading?: boolean;
  uploaded?: boolean;
}

export const UploadPlaceholder = ({
  onPress,
  buttonText = 'Upload File',
  uploadText = 'Uploading File...',
  uploading = false,
  uploaded = false,
}: UploadPlaceholderProps) => {
  if (!uploading) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: '#dddddd',
            height: 250,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <IconButton icon="cloud-upload" size={64} iconColor={theme.colors.primary} />
          <Button mode="contained" dark color={theme.colors.darkDefault} uppercase={false} compact>
            <Text>{buttonText}</Text>
          </Button>
        </View>
      </TouchableWithoutFeedback>
    );
  } else if (uploading && !uploaded) {
    return (
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
          <IconButton icon="cloud-upload" size={64} iconColor={theme.colors.primary} />
          <Button mode="contained" dark color={theme.colors.darkDefault} uppercase={false} compact>
            <Text>{uploadText}</Text>
          </Button>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};
