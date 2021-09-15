import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { getPlaylistById } from '../../state/modules/playlists';

import { useRouteWithParams, useViewPlaylistItem } from '../../hooks/NavigationHooks';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { ScrollView, View } from 'react-native';
import { FAB } from 'react-native-paper';

import { PlaylistCard } from '../layout/PlaylistCard';
import { MediaList } from '../layout/MediaList';
import { ListActionButton } from '../layout/ListActionButton';
import { PageContainer, PageProps } from '../layout/PageContainer';

import { theme } from '../../styles';

export const PlaylistDetail = ({ route, onDataLoaded }: PageProps) => {
  const { playlistId = '' } = route?.params || {};

  const onEditClicked = useRouteWithParams(ROUTES.playlistEdit);
  const onAddToPlaylistClicked = useRouteWithParams(ROUTES.addItemsToPlaylist);
  const onViewPlaylistItemClicked = useViewPlaylistItem();
  const onDeleteClicked = ({ playlistId }) => playlistId;

  const dispatch = useDispatch();

  const selectedPlaylist = useAppSelector((state) => state.playlist.selectedPlaylist);
  const loaded = useAppSelector((state) => state.loaded);
  const [isLoaded, setIsLoaded] = useState(loaded);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      loadData().then(onDataLoaded);
      console.log(selectedPlaylist);
    }
  }, [isLoaded, dispatch, onDataLoaded, loaded, selectedPlaylist]);

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [
    { icon: 'delete', onPress: () => onDeleteClicked({ playlistId }), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.error } },
    { icon: 'edit', onPress: () => onEditClicked({ playlistId }), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
    {
      icon: 'playlist-add',
      onPress: () => onAddToPlaylistClicked({ playlistId }),
      color: theme.colors.primaryTextLighter,
      style: { backgroundColor: theme.colors.primary },
    },
  ];

  const { description = '', title = '', user, category, mediaItems = [] } = selectedPlaylist || {};

  const items = mediaItems;
  const author = user?.username;

  return (
    <PageContainer>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <PlaylistCard
              title={title}
              author={author}
              description={description}
              showSocial={true}
              showActions={false}
              showThumbnail={true}
              onEditClicked={() => onEditClicked({ playlistId })}
              // onDeleteClicked={onDeleteClicked}
              category={category}
            />
            <MediaList
              onViewDetail={(item) => onViewPlaylistItemClicked({ mediaId: item._id, uri: item.uri })}
              list={items}
              isSelectable={false}
              showThumbnail={true}
            />
          </ScrollView>
          <View>
            <ListActionButton icon="playlist-add" label="Add From Collection" actionCb={() => onAddToPlaylistClicked({ playlistId })} />
          </View>
        </View>
      </ScrollView>
      <FAB.Group
        visible={true}
        open={fabState.open}
        icon={fabState.open ? 'close' : 'more-vert'}
        actions={fabActions}
        color={theme.colors.primaryTextLighter}
        fabStyle={{ backgroundColor: fabState.open ? theme.colors.error : theme.colors.primary }}
        onStateChange={(open) => {
          // open && setOpen(!open);
          setFabState(open);
        }}
        // onPress={() => setOpen(!open)}
      />
    </PageContainer>
  );

  async function loadData() {
    await dispatch(getPlaylistById(playlistId));
    setIsLoaded(true);
  }
};

export default withLoadingSpinner(PlaylistDetail);
