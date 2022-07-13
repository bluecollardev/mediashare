import { Card, Subheading } from 'react-native-paper';
import React from 'react';

interface NoItemsProps {
  text?: string;
}

export const NoItems = ({ text = 'There are no items in your collection.' }: NoItemsProps) => (
  <Card style={{ width: '75%', height: '50%' }} elevation={0}>
    <Card.Content>
      <Subheading style={{ textAlign: 'center', fontSize: 15 }}>{text}</Subheading>
    </Card.Content>
  </Card>
);
