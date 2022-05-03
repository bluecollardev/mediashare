import React from 'react';
import { View } from 'react-native';
import { Portal } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

interface LoadingOverlayProps {
  show?: boolean;
  title?: string;
}

export const LoadingOverlay = ({ show = false, title = '' }: LoadingOverlayProps) => {
  return (
    <Portal>
      {show && (
        <View>
          <Spinner visible={show} textContent={title} />
        </View>
      )}
    </Portal>
  );
};
