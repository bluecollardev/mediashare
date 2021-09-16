import { View } from 'react-native';
import { Button } from 'react-native-paper';

import React from 'react';
import styles, { theme } from '../../styles';

interface Props {
  actionLabel?: string;
  cancelLabel?: string;
  actionCb: () => void;
  cancelCb: () => void;
  disableAction?: boolean;
  disableCancel?: boolean;
  rightIcon?: string;
  leftIcon?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const ActionButtons = ({
  cancelCb,
  actionCb,
  actionLabel = 'Next',
  cancelLabel = 'Back',
  disableAction = false,
  disableCancel = false,
  rightIcon = 'share',
  leftIcon = 'cancel',
  loading = false,
}: Props) => {
  return (
    <View style={styles.actionButtons}>
      <Button icon={leftIcon} loading={loading} onPress={() => cancelCb()} style={styles.actionButton} disabled={disableCancel} color={theme.colors.error}>
        {cancelLabel}
      </Button>
      <Button loading={loading} icon={rightIcon} onPress={() => actionCb()} disabled={disableAction} style={styles.actionButton} color={theme.colors.primary}>
        {actionLabel}
      </Button>
    </View>
  );
};
