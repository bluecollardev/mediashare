import { View } from 'react-native';
import { Button } from 'react-native-paper';

import React from 'react';
import styles, { theme } from 'mediashare/styles';

interface Props {
  actionLabel?: string;
  cancelLabel?: string;
  actionCb: () => void;
  cancelCb: () => void;
  disableAction?: boolean;
  disableCancel?: boolean;
  leftIcon?: string;
  cancelIconColor?: string;
  actionIcon?: string;
  actionIconColor?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: any;
  children?: any;
}

export const PlainActionButtons = ({
  cancelCb,
  actionCb,
  actionLabel = 'Next',
  cancelLabel = 'Back',
  disableAction = false,
  disableCancel = false,
  leftIcon = 'cancel',
  cancelIconColor = theme.colors.default,
  actionIcon = 'check-circle',
  actionIconColor = theme.colors.accent,
  loading = false,
  style = undefined,
  children,
}: Props) => {
  const mergedStyles = Object.assign({}, styles.actionButtons, style);
  return (
    <View style={mergedStyles}>
      {children}
      <Button icon={leftIcon} loading={loading} onPress={() => cancelCb()} style={styles.primaryButton} disabled={disableCancel} color={cancelIconColor}>
        {cancelLabel}
      </Button>
      <Button loading={loading} icon={actionIcon} onPress={() => actionCb()} disabled={disableAction} style={styles.primaryButton} color={actionIconColor}>
        {actionLabel}
      </Button>
    </View>
  );
};
