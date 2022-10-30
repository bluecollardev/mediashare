import React, { useState } from 'react';
import { Snackbar } from 'react-native-paper';

export const userSnack = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  const element = (
    <Snackbar
      duration={2000}
      elevation={1}
      style={{
        borderRadius: 10,
      }}
      visible={visible}
      onDismiss={onDismissSnackBar}
      // action={{
      //   label: 'close',
      //   onPress: () => {
      //     // Do something
      //   },
      // }}
    >
      {message}
    </Snackbar>
  );
  return {
    element,
    onToggleSnackBar,
    setMessage,
  };
};
