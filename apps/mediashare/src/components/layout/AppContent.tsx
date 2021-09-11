import { Content } from 'native-base';
import React, { ReactNode } from 'react';

import { StyleSheet } from 'react-native';

interface AppContentProps {
  children: ReactNode;
}

function AppContent({ children }: AppContentProps) {
  return <Content>{children}</Content>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#312e38',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
});

export default AppContent;
