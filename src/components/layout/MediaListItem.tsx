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
  title?: string;
  description?: string;
  image?: string;
  selectable?: boolean;
  showActions?: boolean;
}

export const MediaListItem: React.FC<MediaListItemProps> = (props) => {
  const {
    title,
    description,
    image,
    selectable = true,
    showActions = true
  } = props;
  return (
    <ListItem style={{ borderWidth: 0 }}>
      {selectable && (
        <Left style={{ width: '10%', flex: 1 }}>
          <CheckBox color="black" checked={false} />
        </Left>
      )}
      <Left style={{ width: '20%', flex: 1 }}>
        <Thumbnail square source={{ uri: image }} />
      </Left>
      <Body
        style={{
          flex: 4,
          width: '60%',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          borderWidth: 0
        }}>
        <Text style={{ borderWidth: 0 }}>{title}</Text>
        <Text note numberOfLines={2} style={{ color: 'black' }}>
          {description}
        </Text>
      </Body>
      {showActions === true && (
        <Right style={{ width: '10%', flex: 1 }}>
          <Button transparent>
            <Icon name="chevron-forward-outline" />
          </Button>
        </Right>
      )}
    </ListItem>
  );
};
