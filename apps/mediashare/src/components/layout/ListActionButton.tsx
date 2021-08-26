import { View, Button, Icon, Text } from 'native-base';
import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import { routeConfig } from '../../routes';

interface ListActionButtonProps {
  // children: ReactNode;
  actionCb: () => void;
  label: string;
  icon: string;
}

const ListActionButton = ({ actionCb, label, icon }: ListActionButtonProps) => {
  return (
    <View padder style={styles.container}>
      <Button iconLeft bordered dark style={styles.button} onPress={() => actionCb()}>
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
