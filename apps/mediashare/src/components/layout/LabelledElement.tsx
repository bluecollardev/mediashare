import React, { ReactNode } from 'react';

import { View, StyleSheet } from 'react-native';
import { Caption } from 'react-native-paper';

interface LabelledElementProps {
  children: ReactNode;
  label: string;
}

function LabelledElement({ children, label }: LabelledElementProps) {
  return (
    <View style={styles.container}>
      {children}
      <Caption>{label}</Caption>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', flexDirection: 'column', height: 75 },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
});

export default LabelledElement;
