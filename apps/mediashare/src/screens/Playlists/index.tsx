import * as React from 'react';
import { Container, Content, View, Text, Button, Icon, List } from 'native-base';

import { MediaListItem } from '../../components/layout/MediaListItem';

import { routeConfig } from '../../routes';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { selectPlaylistAction } from '../../state/modules/playlists/index';
import { useRoute } from '@react-navigation/native';

export interface PlaylistsProps {
  navigation: any;
  list: any;
  onViewDetailClicked: Function;
}

export interface PlaylistsState {}

const Playlists = ({ onViewDetailClicked, navigation, list }) => {
  const imageSrc = 'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

  if (!list) {
    return <Text>...loading</Text>;
  }

  const items = list.map((item) => ({
    id: item._id,
    title: item.title,
    description: `${item?.mediaItems?.length || 0} Videos`,
    ...item,
  }));

  return (
    <Container style={styles.container}>
      <Content>
        <View padder style={{ flexDirection: 'row' }}>
          <Button
            iconLeft
            bordered
            dark
            style={{ flex: 1, marginRight: 10 }}
            onPress={() => navigation.navigate(routeConfig.addPlaylist.name, { state: 'create' })}
          >
            <Icon name="add-outline" />
            <Text style={{ paddingRight: 30 }}>Create Playlist</Text>
          </Button>
          <Button iconLeft bordered dark style={{ flex: 1 }} onPress={() => navigation.navigate(routeConfig.shareWith.name)}>
            <Icon name="add-outline" />
            <Text style={{ paddingRight: 30 }}>Share Playlists</Text>
          </Button>
        </View>
        <View>
          <List>
            {items.map((item, idx) => {
              const { title, description } = item;
              return (
                <MediaListItem
                  key={`item-${idx}`}
                  title={title}
                  description={description}
                  onViewDetail={() => {
                    onViewDetailClicked(item);
                  }}
                />
              );
            })}
          </List>
        </View>
        <View padder style={{ flexDirection: 'row' }}>
          <Button iconLeft bordered dark style={{ flex: 1, justifyContent: 'center' }} onPress={() => navigation.navigate(routeConfig.shareWith.name)}>
            <Icon name="share-outline" />
            <Text style={{ paddingRight: 30 }}>Share with User</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

export default Playlists;
