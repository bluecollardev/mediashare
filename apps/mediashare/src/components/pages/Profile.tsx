import React, { ReactNode } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { LoadingSpinnerProps, withLoadingSpinner } from '../hoc/withLoadingSpinner';
import AccountCard from '../layout/AccountCard';

interface ProfileProps extends LoadingSpinnerProps {
  children: ReactNode;
}

function Profile({ children }: ProfileProps) {
  const userId = '6149b54a19531dd4c6b0df59';
  const dispatch = useDispatch();
  userEffect(() => {});
  return <AccountCard />;
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

export default withLoadingSpinner(Profile);
