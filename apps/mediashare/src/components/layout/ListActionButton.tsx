import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from 'native-base';
import { Button } from 'react-native-paper';
import { theme } from '../../styles';

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
    <View padder style={styles.container}>
      <Button mode="contained" color={theme.colors.success} loading={danger} style={styles.button} onPress={() => actionCb()} icon={icon}>
        {label}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    paddingRight: 30,
  },
});

export { ListActionButton };
