import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';

import { routeNames } from '../../routes';

import { useAppSelector } from '../../store';
import { getUserPlaylists, getPlaylistById, removeUserPlaylist, selectPlaylistAction } from '../../store/modules/playlists';
import { loadUsers } from '../../store/modules/users';

import { usePlaylists, useRouteName, useRouteWithParams, useViewMediaItem } from '../../hooks/NavigationHooks';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { Button, FAB, Divider } from 'react-native-paper';

import AppDialog from '../layout/AppDialog';
import { MediaCard } from '../layout/MediaCard';
import { MediaList } from '../layout/MediaList';
import { PageContainer, PageContent, PageActions, PageProps } from '../layout/PageContainer';

import { PlaylistResponseDto } from '../../rxjs-api';

import * as build from '../../build';

import { theme } from '../../styles';
import { View } from 'react-native';

export const PlaylistDetail = ({ route }: PageProps) => {
  const { playlistId = '' } = route?.params || {};

  const edit = useRouteWithParams(routeNames.playlistEdit);
  const addToPlaylist = useRouteWithParams(routeNames.addItemsToPlaylist);
  const viewMediaItem = useViewMediaItem();
  const goToShareWith = useRouteName(routeNames.shareWith);
  const goToPlaylists = usePlaylists();

  const dispatch = useDispatch();

  const { selected } = useAppSelector((state) => state.playlist);
  const appUserId = useAppSelector((state) => state.user?._id);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // @ts-ignore
  const {
    _id,
    title = '',
    author = '',
    createdBy,
    description = '',
    imageSrc,
    category,
    shareCount = 0,
    viewCount = 0,
    likesCount = 0,
    mediaItems = [],
  } = selected || {};
  const items = mediaItems || [];

  const tagKeys = selected?.tags.map((tag) => tag.key);
  const [tags, setTags] = useState(tagKeys);

  useEffect(() => {
    if (!isLoaded) {
      loadData().finally();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // console.log(`Logged In User: ${appUserId}, Media Item Owned By: ${createdBy}`);
  // console.log(selected);

  const allowEdit = createdBy === appUserId;

  const [fabState, setFabState] = useState({ open: false });
  let fabActions = [];
  if (allowEdit) {
    fabActions = [
      { icon: 'delete-forever', onPress: () => setShowDialog(true), color: theme.colors.text, style: { backgroundColor: theme.colors.error } },
      { icon: 'share', onPress: () => sharePlaylist(), color: theme.colors.text, style: { backgroundColor: theme.colors.primary } },
      { icon: 'edit', onPress: () => editPlaylist(), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
    ];
  } else {
    fabActions = [{ icon: 'share', onPress: () => sharePlaylist(), color: theme.colors.text, style: { backgroundColor: theme.colors.text } }];
  }

  return (
    <PageContainer>
      <PageContent>
        <AppDialog
          leftActionLabel={'Cancel'}
          rightActionLabel={'Delete'}
          leftActionCb={() => setShowDialog(false)}
          rightActionCb={() => deletePlaylist()}
          onDismiss={() => setShowDialog(false)}
          showDialog={showDialog}
          title={'Delete Playlist'}
          subtitle={'Are you sure you want to do this? This action is final and cannot be undone.'}
        />
        <ScrollView>
          <MediaCard
            id={_id}
            title={title}
            author={author}
            description={description}
            showSocial={true}
            showActions={false}
            showThumbnail={true}
            thumbnail={imageSrc}
            likes={likesCount}
            shares={shareCount}
            views={viewCount}
            category={category}
            tags={tags}
          >
            <Button
              icon="live-tv"
              color={theme.colors.default}
              mode="outlined"
              style={{ width: '100%', marginTop: 25, marginBottom: 25 }}
              compact
              dark
              onPress={() => (items && items.length > 0 ? viewMediaItem({ mediaId: items[0]._id, uri: items[0].uri }) : undefined)}
            >
              Play From Beginning
            </Button>
            <Divider />
            <MediaList
              onViewDetail={(item) => viewMediaItem({ mediaId: item._id, uri: item.uri })}
              list={items}
              showThumbnail={true}
              // TODO: This is disabled on purpose I'm thinking we don't want to manage items in multiple places just yet!
              selectable={false}
            />
          </MediaCard>
          <Divider />
          {!build.forFreeUser && allowEdit && (
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
              {/*<IconButton
              icon="rule"
              color={isSelectable ? theme.colors.primary : theme.colors.disabled}
              style={{ flex: 0, width: 28, marginTop: 10, marginBottom: 10, marginRight: 10 }}
              onPress={() => (!isSelectable ? activateDeleteMode() : cancelDeletePlaylistItems())}
            />*/}
              <Button
                icon="playlist-add"
                color={theme.colors.accent}
                mode="contained"
                style={{ flex: 1, marginTop: 10, marginBottom: 10 }}
                onPress={() => addToPlaylist({ playlistId })}
                // disabled={actionMode === actionModes.delete}
                compact
                dark
              >
                Add To Playlist
              </Button>
            </View>
          )}
        </ScrollView>
      </PageContent>
      <PageActions>
        {/* TODO: Selectively display depending if the user has scrolled up past the upper button */}
        {/*!build.forFreeUser && allowEdit && (!selectedItems || selectedItems.length === 0) && (
          <ListActionButton icon="playlist-add" label="Add To Playlist" actionCb={() => addToPlaylist({ playlistId })} />
        )*/}
      </PageActions>
      {!build.forFreeUser && (
        <FAB.Group
          visible={true}
          open={fabState.open}
          icon={fabState.open ? 'close' : 'more-vert'}
          actions={fabActions}
          color={theme.colors.text}
          fabStyle={{ backgroundColor: fabState.open ? theme.colors.default : theme.colors.primary }}
          onStateChange={(open) => {
            // open && setOpen(!open);
            setFabState(open);
          }}
          onPress={() => undefined}
        />
      )}
    </PageContainer>
  );

  async function loadData() {
    await dispatch(getPlaylistById(playlistId));
    await dispatch(loadUsers());
    setIsLoaded(true);
  }

  async function sharePlaylist() {
    await dispatch(selectPlaylistAction({ isChecked: true, plist: selected as PlaylistResponseDto }));
    goToShareWith();
  }

  async function cancelSharePlaylist() {
    dispatch(selectPlaylistAction({ isChecked: false, plist: selected as PlaylistResponseDto }));
  }

  async function editPlaylist() {
    edit({ playlistId });
  }

  async function deletePlaylist() {
    await dispatch(removeUserPlaylist(playlistId));
    await dispatch(getUserPlaylists({}));
    await goToPlaylists();
  }
};

export default withLoadingSpinner(PlaylistDetail);
