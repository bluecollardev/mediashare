import * as React from 'react';
import {
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  ListItem,
  CheckBox,
  Thumbnail
} from 'native-base';

export interface MediaListItemProps {
  navigation?: any;
}

export const MediaListItem = () => {
  return (
    <ListItem style={{ borderWidth: 0 }}>
      <Left style={{ width: '10%', flex: 1 }}>
        <CheckBox color="black" checked={false} />
      </Left>
      <Left style={{ width: '20%', flex: 1 }}>
        <Thumbnail
          square
          source={{
            uri:
              'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg'
          }}
        />
      </Left>
      <Body
        style={{
          flex: 4,
          width: '60%',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          borderWidth: 0
        }}>
        <Text style={{ borderWidth: 0 }}>My Video #1</Text>
        <Text note numberOfLines={2} style={{ color: 'black' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </Body>
      <Right style={{ width: '10%', flex: 1 }}>
        <Button transparent>
          <Icon name="chevron-forward-outline" />
        </Button>
      </Right>
    </ListItem>
  );
};
