import * as React from 'react';
import { Text, Button, Icon, Left, Right, ListItem } from 'native-base';

export interface ListItemGroupProps {
  navigation?: any;
  text?: string;
}

export const ListItemGroup = ({ text }: ListItemGroupProps) => {
  return (
    <ListItem itemDivider>
      <Left style={{ width: '85%', flex: 0 }}>
        <Text>{text}</Text>
      </Left>
      <Right style={{ width: '15%', flex: 1 }}>
        {/*<Button transparent>
          <Icon name="chevron-forward-outline" />
        </Button>*/}
      </Right>
    </ListItem>
  );
};
