import React, { ReactNode } from 'react';

import { RefreshControl, ScrollView } from 'react-native';

interface AppRefresherProps {
  children: ReactNode;
  refreshing: boolean;
  onRefresh: any;
}

function AppRefresher({ children, refreshing, onRefresh }: AppRefresherProps) {
  return <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}> {children} </ScrollView>;
}

export default AppRefresher;
