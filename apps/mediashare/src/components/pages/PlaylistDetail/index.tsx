import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container, Icon, View } from 'native-base';
import { Text } from 'react-native';

import { routeConfig, ROUTES } from '../../../routes';

import { useRouteWithParams, useViewMediaItem } from '../../../hooks/NavigationHooks';

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
        navigation.navigate(routeConfig.addFromMedia.name);
      }}
    >
      <Icon name="add-outline" />
      <Text style={{ paddingRight: 30 }}>Add From Media</Text>
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

  const [loaded, setLoaded] = useState(false);
  const playlist = useAppSelector((state) => state.playlist);

  const { playlistId = '' } = route?.params;
  useEffect(() => {
    if (!loaded) {
      dispatch(getPlaylistById(playlistId));
      setLoaded(true);
    }
  }, [loaded, dispatch, playlistId]);
  if (!playlistId) {
    return <Text>Item not found</Text>;
  }

  const { selectedPlaylist } = playlist || {};

  const { description = '', title = '', user, category } = selectedPlaylist || {};
  console.log(selectedPlaylist);
  const items = selectedPlaylist?.mediaItems || [];
  const author = user?.username;

  return (
    <Container style={styles.container}>
      <View padder>
        <PlaylistCard
          title={title}
          author={author}
          description={description}
          showSocial={false}
          showActions={true}
          showThumbnail={true}
          onEditClicked={() => onEditClicked({ playlistId })}
          onDeleteClicked={onDeleteClicked}
          category={category}
        />
      </View>
      <ListActionButton icon="plus" label="Add From Media" actionCb={() => onAddToPlaylist({ playlistId })} />
      <MediaList onViewDetail={(item) => onViewMediaItemClicked({ mediaId: item._id, uri: item.uri })} list={items} isSelectable={false} showThumbnail={true} />
    </Container>
  );
};

export default PlaylistDetailContainer;
