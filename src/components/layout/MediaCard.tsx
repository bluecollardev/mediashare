import * as React from 'react';
import {
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  CardItem,
  Card,
  View,
  ActionSheet
} from 'native-base';
import { Image } from 'react-native';

export interface MediaListItemProps {
  navigation?: any;
  mediaSrc?: string | null;
  title?: string;
  author?: string;
  description?: string;
  showSocial?: any | boolean;
  buttons?: any | boolean;
  content?: any;
  onActionsClicked?: () => void;
}

export const MediaCard: React.FC<MediaListItemProps> = (props) => {
  const {
    title = '',
    author = '',
    description = '',
    mediaSrc = null,
    showSocial = false,
    buttons = false,
    onActionsClicked = () => {},
    children
  } = props;

  return (
    <Card style={{ flex: 0 }}>
      {mediaSrc && (
        <CardItem cardBody>
          <Image
            source={{ uri: mediaSrc }}
            style={{ height: 200, width: null, flex: 1, marginTop: 5 }}
          />
        </CardItem>
      )}
      <CardItem>
        <Body>
          <Text>{title}</Text>
          <Text style={{ fontSize: 12, color: 'grey' }}>
            {author} @bluecollardev
          </Text>
          <Text style={{ fontSize: 12, color: 'grey' }}>5 items - 1h 20m</Text>
        </Body>
        <Right>
          <Button transparent onPress={onActionsClicked}>
            <Icon name="ellipsis-vertical" />
          </Button>
        </Right>
      </CardItem>
      <CardItem>
        <Text note numberOfLines={3} style={{ color: 'black' }}>
          {description}
        </Text>
      </CardItem>
      {buttons && typeof buttons === 'function' && (
        <View padder style={{ flexDirection: 'row' }}>
          {buttons()}
        </View>
      )}
      {children}
      {showSocial === true && (
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up-outline" />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles-outline" />
              <Text>4 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Button transparent>
              <Icon active name="arrow-redo-outline" />
              <Text>3 Shares</Text>
            </Button>
          </Right>
        </CardItem>
      )}
    </Card>
  );
};
