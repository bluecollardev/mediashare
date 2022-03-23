import React from 'react';
import { View } from 'react-native';
import { Portal } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

interface LoadingOverlayProps {
  show?: boolean;
  onDismiss?: any;
  title?: string;
  subtitle?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const LoadingOverlay = ({ show = false, onDismiss, title, subtitle }: LoadingOverlayProps) => {
  // @ts-ignore
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

export default LoadingOverlay;
// export default withLoadingSpinner(undefined)(LoadingOverlay);
