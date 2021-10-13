import { Button, IconButton } from 'react-native-paper';
import React from 'react';
import { theme } from '../../styles';
import { TouchableWithoutFeedback, View } from 'react-native';

interface UploadPlaceholderProps {
  onPress?: () => void;
  buttonText?: string;
}

export const UploadPlaceholder = ({ onPress, buttonText = 'Upload File' }: UploadPlaceholderProps) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.uploadPlaceholder.container}>
      <IconButton icon="cloud-upload" size={64} color={theme.colors.primary} />
      <Button mode="contained" dark color={theme.colors.primary} compact>
        {buttonText}
      </Button>
    </View>
  </TouchableWithoutFeedback>
);

const styles = {
  uploadPlaceholder: {
    container: {
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: '#dddddd',
      height: 250,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  },
};
