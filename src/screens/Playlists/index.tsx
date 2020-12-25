import * as React from 'react';
import {
  Container,
  Content,
  View,
  Text,
  Button,
  Icon,
  Left,
  Right,
  List,
  ListItem
} from 'native-base';

import { MediaListItem } from '../../components/layout/MediaListItem';
import { ListItemGroup } from '../../components/layout/ListItemGroup';

import styles from './styles';
import { AppHeader } from '../../components/layout/AppHeader';

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
        <AppHeader
          title="Playlists"
          navigation={navigation}
          showSearch={true}
          showSort={true}
        />
        <Content>
          <View padder style={{ flexDirection: 'row' }}>
            <Button iconLeft bordered dark style={{ flex: 1, marginRight: 10 }}>
              <Icon name="add-outline" />
              <Text style={{ paddingRight: 30 }}>Create Playlist</Text>
            </Button>
            <Button iconLeft bordered dark style={{ flex: 1 }}>
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
              style={{ flex: 1, justifyContent: 'center' }}>
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
