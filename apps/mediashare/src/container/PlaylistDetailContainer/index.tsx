import { Container, Content, List, View } from 'native-base';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { PlaylistCard } from '../../components/layout/PlaylistCard';
import { ROUTES } from '../../routes';
import styles from '../../screens/Home/styles';

import { useAppSelector } from '../../state/index';
import { getPlaylistById } from '../../state/modules/playlists/index';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import MediaList from '../../components/layout/MediaList';
import { usePageRoute, useRouteWithParams } from '../../hooks/NavigationHooks';
export interface PlaylistDetailContainerProps {
  navigation: any;
  route: any;
  fetchList: Function;
  data: Object;
  state: Object;
  playlistId: string | number; // TODO: Make a type
}
export interface PlaylistDetailContainerState {}

const PlaylistDetailContainer = ({ route }) => {
  const onEditClicked = useRouteWithParams(ROUTES.playlistEdit);
  const onViewMediaItemClicked = usePageRoute('library', 'libraryItemDetail', {});

  const onDeleteClicked = () => {};
  const dispatch = useDispatch();

  const loadData = async function () {
    await dispatch(dispatch(getPlaylistById(playlistId)));

    setLoaded(true);
  };
  const [loaded, setLoaded] = useState(false);
  const playlist = useAppSelector((state) => state.playlist);

  const { playlistId = '' } = route?.params;
  useEffect(() => {
    if (!playlist.loading && playlist.selectedPlaylist?._id !== playlistId) {
      loadData();
    }
  });
  if (!playlistId) {
    return <Text>Item not found</Text>;
  }

  const { selectedPlaylist } = playlist || {};

  const { description = '', title = '', user } = selectedPlaylist || {};

  const items = selectedPlaylist?.mediaItems || [];

  const author = user?.username;

  return (
    <Container style={styles.container}>
      <Content>
        <View padder>
          <PlaylistCard
            title={title}
            author={author}
            description={description}
            showSocial={true}
            showActions={true}
            onEditClicked={() => onEditClicked({ playlistId })}
            onDeleteClicked={onDeleteClicked}
          />
          <MediaList onViewDetail={onViewMediaItemClicked} list={items} isSelectable={false} />
        </View>
      </Content>
    </Container>
  );
};

export default PlaylistDetailContainer;
