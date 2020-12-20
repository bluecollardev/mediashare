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
} from 'native-base';
import { Image } from 'react-native';

export interface MediaListItemProps {
  navigation?: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MediaCard = (props: MediaListItemProps) => {
  return (
    <Card style={{ flex: 0 }}>
      <CardItem cardBody>
        <Image
          source={{
            uri:
              'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg'
          }}
          style={{ height: 200, width: null, flex: 1 }}
        />
      </CardItem>
      <CardItem>
        {/*<Left>
                <Thumbnail
                  source={{
                    uri:
                      'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg'
                  }}
                />
              </Left>*/}
        <Body>
          <Text>My Video #1</Text>
          <Text note>Blue Collar Dev</Text>
        </Body>
        <Right>
          <Text>11h ago</Text>
        </Right>
      </CardItem>
      <CardItem>
        <Text note numberOfLines={3} style={{ color: 'black' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </CardItem>
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
    </Card>
  );
};
