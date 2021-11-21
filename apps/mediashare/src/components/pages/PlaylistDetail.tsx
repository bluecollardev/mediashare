import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../store';
import { getUserPlaylists, getPlaylistById, removeUserPlaylist, updateUserPlaylist } from '../../store/modules/playlists';
import { loadUsers } from '../../store/modules/users';

import { usePlaylists, useRouteName, useRouteWithParams, useViewMediaItem } from '../../hooks/NavigationHooks';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { Button, FAB, Divider, IconButton } from 'react-native-paper';

import AppDialog from '../layout/AppDialog';
import { MediaCard } from '../layout/MediaCard';
import { MediaList } from '../layout/MediaList';
import { ListActionButton } from '../layout/ListActionButton';
import { PageContainer, PageContent, PageActions, PageProps } from '../layout/PageContainer';
import { ActionButtons } from '../layout/ActionButtons';

import { MediaItem } from '../../rxjs-api';

import * as build from '../../build';

import { createRandomRenderKey } from '../../core/utils';

import { theme } from '../../styles';
import { View } from 'react-native';

export const PlaylistDetail = ({ route }: PageProps) => {
  const { playlistId = '' } = route?.params || {};

  const edit = useRouteWithParams(ROUTES.playlistEdit);
  const addToPlaylist = useRouteWithParams(ROUTES.addItemsToPlaylist);
  const viewMediaItem = useViewMediaItem();
  const shareWith = useRouteName(ROUTES.shareWith);
  const goToPlaylists = usePlaylists();

  const dispatch = useDispatch();

  const { selected } = useAppSelector((state) => state.playlist);
  const appUserId = useAppSelector((state) => state.user?._id);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // @ts-ignore
  const { _id, title = '', author = '', createdBy, description = '', imageSrc, category, shareCount = 0, viewCount = 0, likesCount = 0, mediaItems = [] } =
    selected || {};
  const items = mediaItems || [];

  useEffect(() => {
    if (!isLoaded) {
      loadData();
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
      { icon: 'share', onPress: shareWith, color: theme.colors.text, style: { backgroundColor: theme.colors.primary } },
      { icon: 'edit', onPress: () => editPlaylist(), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
    ];
  } else {
    fabActions = [{ icon: 'share', onPress: shareWith, color: theme.colors.text, style: { backgroundColor: theme.colors.text } }];
  }

  const [clearSelectionKey, setClearSelectionKey] = useState(createRandomRenderKey());
  useEffect(() => {
    clearCheckboxSelection();
  }, []);

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
        >
          <Button
            icon="live-tv"
            color={theme.colors.default}
            mode="outlined"
            style={{ width: '100%', marginBottom: 10 }}
            compact
            dark
            onPress={() => (items && items.length > 0 ? viewMediaItem({ mediaId: items[0]._id, uri: items[0].uri }) : undefined)}
          >
            Play From Beginning
          </Button>
        </MediaCard>
        <Divider />
        {!build.forFreeUser && allowEdit && (!selectedItems || selectedItems.length === 0) && (
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
        <MediaList
          key={clearSelectionKey}
          onViewDetail={(item) => viewMediaItem({ mediaId: item._id, uri: item.uri })}
          list={items}
          showThumbnail={true}
          // TODO: This is disabled on purpose I'm thinking we don't want to manage items in multiple places just yet!
          selectable={false}
          showActions={!selectedItems || selectedItems.length === 0}
          removeItem={onRemoveItem}
          addItem={onAddItem}
        />
      </PageContent>
      <PageActions>
        {/* TODO: Selectively display depending if the user has scrolled up past the upper button */}
        {/*!build.forFreeUser && allowEdit && (!selectedItems || selectedItems.length === 0) && (
          <ListActionButton icon="playlist-add" label="Add To Playlist" actionCb={() => addToPlaylist({ playlistId })} />
        )*/}
        {!build.forFreeUser && allowEdit && selectedItems && selectedItems.length > 0 && (
          <ActionButtons
            actionCb={confirmDeletePlaylistItems}
            cancelCb={cancelDeletePlaylistItems}
            actionLabel="Remove"
            cancelLabel="Cancel"
            rightIcon="delete"
          />
        )}
      </PageActions>
      {!build.forFreeUser && (!selectedItems || selectedItems.length === 0) && (
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
          onPress={() => {
            clearCheckboxSelection();
            resetData();
          }}
        />
      )}
    </PageContainer>
  );

  function saveWithIds(mediaIds: string[]) {
    return dispatch(
      updateUserPlaylist({
        title: title,
        mediaIds,
        description: description,
        category: category as any,
        _id: selected._id,
        imageSrc,
      })
    );
  }

  async function loadData() {
    await dispatch(getPlaylistById(playlistId));
    await dispatch(loadUsers());
    setIsLoaded(true);
  }

  function clearCheckboxSelection() {
    const randomKey = createRandomRenderKey();
    setClearSelectionKey(randomKey);
  }

  // const [selected, setSelected] = useState(selectedItems.size);
  function onAddItem(item: MediaItem) {
    // setSelected(selectedItems.size);
    const updatedItems = selectedItems.concat([item._id]);
    setSelectedItems(updatedItems);
  }

  function onRemoveItem(selectedItem: MediaItem) {
    const updatedItems = selectedItems.filter((item) => item !== selectedItem._id);
    setSelectedItems(updatedItems);
  }

  async function confirmDeletePlaylistItems() {
    await saveMediaUpdates();
    clearCheckboxSelection();
    resetData();
  }

  async function cancelDeletePlaylistItems() {
    clearCheckboxSelection();
    resetData();
  }

  // TODO: We have to do this automatically, and on!
  /* async function save() {
    await saveWithIds(selectedPlaylist.mediaIds);
    setIsLoaded(false);
    await loadData();
  } */

  async function saveMediaUpdates() {
    // @ts-ignore
    const mediaIds = selected.mediaIds || [];
    const filtered = mediaIds.filter((id) => !selectedItems.includes(id));

    await saveWithIds(filtered);
    setIsLoaded(false);
    await loadData();
  }

  function resetData() {
    setSelectedItems([]);
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
