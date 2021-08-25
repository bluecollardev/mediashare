import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Playlists from '../../screens/Playlists';

import { findUserPlaylists, selectPlaylistAction } from '../../state/modules/playlists';
import { routeConfig } from '../../routes';

import { useAppSelector } from '../../state';
import { useEffect, useState } from 'react';
import { Container, Content, View, Button, Icon, Text } from 'native-base';
import styles from '../../screens/Home/styles';

export interface PlaylistsContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}

export const PlaylistsContainer = ({ navigation }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const playlists = useAppSelector((state) => state.playlists);

  useEffect(() => {
    if (!loaded) {
      dispatch(findUserPlaylists({}));
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const onViewDetailClicked = (item) => {
    dispatch(selectPlaylistAction(item));
    navigation.navigate(routeConfig.playlistDetail.name, { playlistId: item._id });
  };
  return (
    <Container style={styles.container}>
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

      <Content>
        <Playlists navigation={navigation} list={playlists.userPlaylists} onViewDetailClicked={onViewDetailClicked} />
      </Content>
      <View padder style={{ flexDirection: 'row' }}>
        <Button iconLeft bordered dark style={{ flex: 1, justifyContent: 'center' }} onPress={() => navigation.navigate(routeConfig.shareWith.name)}>
          <Icon name="share-outline" />
          <Text style={{ paddingRight: 30 }}>Share with User</Text>
        </Button>
      </View>
    </Container>
  );
};

export default PlaylistsContainer;
