import { Card, Subheading } from 'react-native-paper';
import React from 'react';

interface NoItemsProps {
  text?: string;
}

export const NoItems = ({ text = 'There are no items in your collection.' }: NoItemsProps) => (
  <Card style={{ width: '100%', height: '50%' }}>
    <Card.Content>
      <Subheading style={{ textAlign: 'center', fontSize: 13 }}>{text}</Subheading>
    </Card.Content>
  </Card>
);
