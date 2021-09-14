import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { useRouteWithParams, useViewPlaylistItem } from '../../hooks/NavigationHooks';
import { useSpinner } from '../../hooks/useSpinner';

import { useAppSelector } from '../../state';
import { findUserPlaylists, getPlaylistById } from '../../state/modules/playlists';

import { ScrollView, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { PlaylistCard } from '../layout/PlaylistCard';
import { MediaList } from '../layout/MediaList';
import { ListActionButton } from '../layout/ListActionButton';
import { PageContainer } from '../layout/PageContainer';

import { theme } from '../../styles';

export const PlaylistDetailContainer = ({ route }) => {
  const dispatch = useDispatch();

  const { playlistId = '' } = route?.params;

  const onEditClicked = useRouteWithParams(ROUTES.playlistEdit);
  const onAddToPlaylistClicked = useRouteWithParams(ROUTES.addItemsToPlaylist);
  const onViewPlaylistItemClicked = useViewPlaylistItem();
  const onDeleteClicked = ({ playlistId }) => playlistId;

  const selectedPlaylist = useAppSelector((state) => state.playlist.selectedPlaylist);

  const [fabState, setState] = useState({ open: false });

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

  return (
    <PageContainer>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <PlaylistCard
              title={title}
              author={author}
              description={description}
              showSocial={false}
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
        <FAB.Group
          visible={true}
          open={fabState.open}
          icon={fabState.open ? 'close' : 'more-vert'}
          actions={fabActions}
          color={theme.colors.primaryTextLighter}
          fabStyle={{ backgroundColor: fabState.open ? theme.colors.error : theme.colors.primary }}
          onStateChange={(open) => {
            // open && setOpen(!open);
            setState(open);
          }}
          // onPress={() => setOpen(!open)}
        />
      </ScrollView>
    </PageContainer>
  );
};

export default PlaylistDetailContainer;
