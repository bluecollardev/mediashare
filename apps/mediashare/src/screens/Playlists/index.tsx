import * as React from 'react';
import { Container, Content, View, Text, Button, Icon, List } from 'native-base';

import { MediaListItem } from '../../components/layout/MediaListItem';

import { routeConfig } from '../../routes';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { selectPlaylistAction } from '../../state/modules/playlists/index';

export interface PlaylistsProps {
  navigation: any;
  list: any;
  onViewDetailClicked: Function;
}

export interface PlaylistsState {}

const Playlists = (props) => {
  const dispatch = useDispatch();
  const onViewDetailClicked = (item) => {
    dispatch(selectPlaylistAction(item));
  };
  const { navigation, list } = props;
  const imageSrc = 'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

  if (!list) {
    return <Text>...loading</Text>;
  }
  const items = list.map((item) => ({
    id: item._id,
    title: item.title,
    description: `${item?.mediaItems?.length || 0} Videos`,
    image: imageSrc,
    ...item,
  }));

  return (
    <Container style={styles.container}>
      <Content>
        <View padder style={{ flexDirection: 'row' }}>
          <Button iconLeft bordered dark style={{ flex: 1, marginRight: 10 }} onPress={() => navigation.navigate(routeConfig.playlistEdit.name)}>
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
            {/* <ListItemGroup key={'group1'} text={'Group 1'} /> */}
            {items.map((item, idx) => {
              const { title, description, image } = item;
              return (
                <MediaListItem
                  key={`item-${idx}`}
                  title={title}
                  description={description}
                  image={image}
                  onViewDetail={() => {
                    onViewDetailClicked(item);
                  }}
                />
              );
            })}
            {/* <ListItemGroup key={'group2'} text={'Group 2'} /> */}
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
