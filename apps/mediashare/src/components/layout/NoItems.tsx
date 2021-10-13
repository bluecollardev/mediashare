import { Card, Subheading } from 'react-native-paper';
import React from 'react';

export const NoItems = () => (
  <Card style={{ width: '100%' }}>
    <Card.Content>
      <Subheading style={{ textAlign: 'center' }}>There are no items in your collection.</Subheading>
    </Card.Content>
  </Card>
);
