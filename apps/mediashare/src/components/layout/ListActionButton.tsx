import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Button, Icon, Text } from 'native-base';

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
      <Button success danger={danger} iconLeft style={styles.button} onPress={() => actionCb()}>
        <Icon name={icon + '-outline'} />
        <Text style={styles.text}>{label}</Text>
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
