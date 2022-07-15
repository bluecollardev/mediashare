import React from 'react';

import { Button } from 'react-native-paper';
import styles, { theme } from 'mediashare/styles';

interface ListActionButtonProps {
  // children: ReactNode;
  actionCb: () => void;
  label: string;
  icon: string;
  loading?: boolean;
  dark?: boolean;
  mode?: 'text' | 'outlined' | 'contained';
  color?: string;
}

const ListActionButton = ({ loading = false, actionCb, label, icon, mode = 'contained', color = theme.colors.accent }: ListActionButtonProps) => {
  return (
    <Button mode={mode} dark color={color} loading={loading} style={styles.primaryButton} onPress={() => actionCb()} icon={icon}>
      {label}
    </Button>
  );
};

export { ListActionButton };
