import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container, Icon, View } from 'native-base';
import { RefreshControl, ScrollView, Text } from 'react-native';

import { routeConfig, ROUTES } from '../../../routes';

import { useRouteWithParams, useViewMediaItem } from '../../../hooks/NavigationHooks';

import { useAppSelector } from '../../../state';
import { getPlaylistById } from '../../../state/modules/playlists';

import { PlaylistCard } from '../../layout/PlaylistCard';
import { MediaList } from '../../layout/MediaList';
import { ListActionButton } from '../../layout/ListActionButton';

import styles from '../../../styles';
import { useLoadPlaylistByIdData } from '../../../hooks/useLoadData';
import PageContainer from '../../layout/PageContainer';
import { useSpinner } from '../../../hooks/useSpinner';

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
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export const PlaylistDetailContainer = ({ route }) => {
  const onEditClicked = useRouteWithParams(ROUTES.playlistEdit);
  const onViewMediaItemClicked = useViewMediaItem();
  const onAddToPlaylist = useRouteWithParams(ROUTES.addItemsToPlaylist);

  const onDeleteClicked = () => {};
  const { playlistId = '' } = route?.params;
  const [{ AppSpinner, isLoading, endLoad }] = useSpinner({ loadingState: true });
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const selectedPlaylist = useAppSelector((state) => state.playlist.selectedPlaylist);
  useEffect(() => {
    async function loadData() {
      await dispatch(getPlaylistById(playlistId));
      endLoad();
    }
    if (!loaded) {
      loadData();
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, playlistId]);

  const { description = '', title = '', user, category, mediaItems = [] } = selectedPlaylist || {};

  const items = mediaItems;
  const author = user?.username;

  if (!loaded || isLoading) {
    return <AppSpinner />;
  }

  return (
    <PageContainer>
      <AppSpinner />

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
      <ListActionButton icon="add" label="Add From Media" actionCb={() => onAddToPlaylist({ playlistId })} />
      <MediaList onViewDetail={(item) => onViewMediaItemClicked({ mediaId: item._id, uri: item.uri })} list={items} isSelectable={false} showThumbnail={true} />
    </PageContainer>
  );
};

export default PlaylistDetailContainer;
