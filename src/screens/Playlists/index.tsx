import * as React from 'react';
import {
  Container,
  Content,
  View,
  Text,
  Button,
  Icon,
  List
} from 'native-base';

import { MediaListItem } from '../../components/layout/MediaListItem';

import { routeConfig } from '../../routes';
import styles from './styles';

export interface PlaylistsProps {
  navigation: any;
  list: any;
}

export interface PlaylistsState {}

class Playlists extends React.Component<PlaylistsProps, PlaylistsState> {
  render() {
    const { navigation } = this.props;
    const imageSrc =
      'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

    const items1 = [
      { title: 'Playlist 1', description: '9 Videos', image: imageSrc },
      { title: 'Playlist 2', description: '2 Videos', image: imageSrc }
    ];
    const items2 = [
      { title: 'Playlist 3', description: '3 Videos', image: imageSrc },
      { title: 'Playlist 4', description: '6 Videos', image: imageSrc }
    ];

    return (
      <Container style={styles.container}>
        <Content>
          <View padder style={{ flexDirection: 'row' }}>
            <Button
              iconLeft
              bordered
              dark
              style={{ flex: 1, marginRight: 10 }}
              onPress={() =>
                navigation.navigate(routeConfig.playlistEdit.name)
              }>
              <Icon name="add-outline" />
              <Text style={{ paddingRight: 30 }}>Create Playlist</Text>
            </Button>
            <Button
              iconLeft
              bordered
              dark
              style={{ flex: 1 }}
              onPress={() => navigation.navigate(routeConfig.shareWith.name)}>
              <Icon name="add-outline" />
              <Text style={{ paddingRight: 30 }}>Share Playlists</Text>
            </Button>
          </View>
          <View>
            <List>
              {/* <ListItemGroup key={'group1'} text={'Group 1'} /> */}
              {items1.map((item, idx) => {
                const { title, description, image } = item;
                return (
                  <MediaListItem
                    key={`item-${idx}`}
                    title={title}
                    description={description}
                    image={image}
                    onViewDetail={() =>
                      navigation.navigate(routeConfig.playlistDetail.name)
                    }
                  />
                );
              })}
              {/* <ListItemGroup key={'group2'} text={'Group 2'} /> */}
              {items2.map((item, idx) => {
                const { title, description, image } = item;
                return (
                  <MediaListItem
                    key={`item-${idx}`}
                    title={title}
                    description={description}
                    image={image}
                    onViewDetail={() =>
                      navigation.navigate(routeConfig.playlistDetail.name)
                    }
                  />
                );
              })}
            </List>
          </View>
          <View padder style={{ flexDirection: 'row' }}>
            <Button
              iconLeft
              bordered
              dark
              style={{ flex: 1, justifyContent: 'center' }}
              onPress={() => navigation.navigate(routeConfig.shareWith.name)}>
              <Icon name="share-outline" />
              <Text style={{ paddingRight: 30 }}>Share with User</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Playlists;
