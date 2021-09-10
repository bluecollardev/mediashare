import { Text } from 'react-native';
import React from 'react';
import { Card, CardItem } from 'native-base';

export const LoadingContent = () => {
  return (
    <Card>
      <CardItem>
        <Text style={{ display: 'flex', justifyContent: 'center' }}>Loading...</Text>
      </CardItem>
    </Card>
  );
};
