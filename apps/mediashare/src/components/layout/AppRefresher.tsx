import { container } from 'aws-amplify';
import React, { ReactNode } from 'react';

import { View, Text, StyleSheet, RefreshControl, ScrollView } from 'react-native';

interface AppRefresherProps {
  children: ReactNode;
  refreshing: boolean;
  onRefresh: any;
}

function AppRefresher({ children, refreshing, onRefresh }: AppRefresherProps) {
  return <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}> {children} </ScrollView>;
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

export default AppRefresher;
