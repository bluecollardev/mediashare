import { Container } from 'native-base';
import React, { ReactNode } from 'react';
import themeStyles from '../../styles';
import { SafeAreaView, StyleSheet } from 'react-native';

interface PageContainerProps {
  children: ReactNode;
}

function PageContainer({ children }: PageContainerProps) {
  return <SafeAreaView style={themeStyles.container}>{children}</SafeAreaView>;
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

export default PageContainer;
