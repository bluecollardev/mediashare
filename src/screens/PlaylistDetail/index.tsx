import * as React from 'react';
import {
  Button,
  Container,
  Content,
  Icon,
  List,
  Text,
  View
} from 'native-base';

import MediaDetail, {
  MediaDetailProps,
  MediaDetailState
} from '../MediaDetail';
import { MediaListItem } from '../../components/layout/MediaListItem';

import { routeConfig } from '../../routes';
import styles from './styles';

import { PlaylistCard } from '../../components/layout/PlaylistCard';

export interface PlaylistDetailProps extends MediaDetailProps {
  navigation: any;
  list: any;
}
export interface PlaylistDetailState extends MediaDetailState {}

class PlaylistDetail extends MediaDetail<
  PlaylistDetailProps,
  PlaylistDetailState
> {
  render() {
    const { navigation } = this.props;
    const imageSrc =
      'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

    const title = 'My First Playlist';
    const author = 'Blue Collar Dev';
    const description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
      'eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    const items = [
      { title: 'Video 1', description: 'Ipsum lorem dolor', image: imageSrc },
      { title: 'Video 2', description: 'Ipsum lorem dolor', image: imageSrc },
      { title: 'Video 3', description: 'Ipsum lorem dolor', image: imageSrc },
      { title: 'Video 4', description: 'Ipsum lorem dolor', image: imageSrc },
      { title: 'Video 5', description: 'Ipsum lorem dolor', image: imageSrc }
    ];

    return (
      <Container style={styles.container}>
        <Content>
          <View padder>
            <PlaylistCard
              title={title}
              author={author}
              description={description}
            />
          </View>
          <View padder style={{ flexDirection: 'row' }}>
            <Button
              iconLeft
              bordered
              dark
              style={{ flex: 1, marginRight: 10, justifyContent: 'center' }}
              onPress={() => {
                navigation.navigate(routeConfig.addFromLibrary.name);
              }}>
              <Icon name="add-outline" />
              <Text style={{ paddingRight: 30 }}>Add Video From Library</Text>
            </Button>
          </View>
          <View>
            <List>
              {items.map((item, idx) => {
                const { title, description, image } = item;
                return (
                  <MediaListItem
                    key={`item-${idx}`}
                    title={title}
                    description={description}
                    image={image}
                    onViewDetail={() => {
                      navigation.navigate(routeConfig.libraryItemDetail.name);
                    }}
                  />
                );
              })}
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}

export default PlaylistDetail;
