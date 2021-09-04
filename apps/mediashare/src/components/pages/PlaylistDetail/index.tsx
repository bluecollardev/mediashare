import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container, Icon, View } from 'native-base';
import { Text } from 'react-native';

import { routeConfig, ROUTES } from '../../../routes';

import { usePageRoute, useRouteWithParams, useViewMediaItem, useViewPlaylist } from '../../../hooks/NavigationHooks';

import { useAppSelector } from '../../../state';
import { getPlaylistById } from '../../../state/modules/playlists';

import { PlaylistCard } from '../../layout/PlaylistCard';
import { MediaList } from '../../layout/MediaList';
import { ListActionButton } from '../../layout/ListActionButton';

import styles from '../../../styles';

export interface PlaylistDetailProps {
  navigation: any;
  list: any;
}

export interface PlaylistDetailState {}

export const PlaylistDetail = (props) => {
  const { navigation } = props;

  return (
    <Button
      iconLeft
      bordered
      dark
      style={{ flex: 1, marginRight: 10, justifyContent: 'center' }}
      onPress={() => {
        navigation.navigate(routeConfig.addFromLibrary.name);
      }}
    >
      <Icon name="add-outline" />
      <Text style={{ paddingRight: 30 }}>Add Video From Library</Text>
    </Button>
  );
};

export interface PlaylistDetailContainerProps {
  navigation: any;
  route: any;
  fetchList: Function;
  data: Object;
  state: Object;
  playlistId: string | number; // TODO: Make a type
}
export interface PlaylistDetailContainerState {}

export const PlaylistDetailContainer = ({ route }) => {
  const onEditClicked = useRouteWithParams(ROUTES.playlistEdit);
  const onViewMediaItemClicked = useViewMediaItem();
  const onAddToPlaylist = useRouteWithParams(ROUTES.addItemsToPlaylist);

  const onDeleteClicked = () => {};
  const dispatch = useDispatch();

  const loadData = async function () {
    await dispatch(getPlaylistById(playlistId));

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
      </View>
      <ListActionButton icon="add" label="Add Video From Library" actionCb={() => onAddToPlaylist({ playlistId })} />
      <MediaList onViewDetail={(item) => onViewMediaItemClicked({ mediaId: item._id, uri: item.uri })} list={items} isSelectable={false} />
    </Container>
  );
};

export default PlaylistDetailContainer;
