import React from 'react';

import { View } from 'react-native';
import { Button } from 'react-native-paper';
import styles, { theme } from '../../styles';

interface ListActionButtonProps {
  // children: ReactNode;
  actionCb: () => void;
  label: string;
  icon: string;
  danger?: boolean;
  dark?: boolean;
}

const ListActionButton = ({ danger = false, actionCb, label, icon }: ListActionButtonProps) => {
  return (
    <Button mode="contained" dark color={theme.colors.primary} loading={danger} style={styles.actionButton} onPress={() => actionCb()} icon={icon}>
      {label}
    </Button>
  );
};

export { ListActionButton };
