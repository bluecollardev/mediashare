import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { getPlaylistById, removeUserPlaylist, updateUserPlaylist } from '../../state/modules/playlists';
import { loadUsers } from '../../state/modules/users';

import { usePlaylists, useRouteName, useRouteWithParams, useViewMediaItem } from '../../hooks/NavigationHooks';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { Button, FAB } from 'react-native-paper';

import AppDialog from '../layout/AppDialog';
import { MediaCard } from '../layout/MediaCard';
import { MediaList } from '../layout/MediaList';
import { ListActionButton } from '../layout/ListActionButton';
import { PageContainer, PageContent, PageActions, PageProps } from '../layout/PageContainer';
import { ActionButtons } from '../layout/ActionButtons';

import { MediaItem } from '../../rxjs-api';

import { theme } from '../../styles';

export const PlaylistDetail = ({ route, onDataLoaded }: PageProps) => {
  const { playlistId = '' } = route?.params || {};

  const edit = useRouteWithParams(ROUTES.playlistEdit);
  const addToPlaylist = useRouteWithParams(ROUTES.addItemsToPlaylist);
  const viewMediaItem = useViewMediaItem();
  const shareWith = useRouteName(ROUTES.shareWith);
  const playlists = usePlaylists();

  const dispatch = useDispatch();

  const selectedPlaylist = useAppSelector((state) => state.playlist.selectedPlaylist);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const { _id, title = '', userId, author = '', description = '', imageSrc, category, shareCount = 0, viewCount = 0, likesCount = 0, mediaItems = [] } = selectedPlaylist || {};
  const items = mediaItems || [];

  useEffect(() => {
    if (!isLoaded) {
      loadData().then(onDataLoaded);
    }
  }, [isLoaded, onDataLoaded]);

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [
    { icon: 'delete', onPress: () => setShowDialog(true), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.error } },
    { icon: 'share', onPress: shareWith, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primaryDarker } },
    { icon: 'edit', onPress: () => editPlaylist(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.accent } },
  ];

  const [clearSelectionKey, setClearSelectionKey] = useState(Math.random());
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
          userId={userId}
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
          <Button icon="live-tv" color={theme.colors.primary} mode={'outlined'} style={{ width: '100%', marginBottom: 10 }} compact>
            Play From Beginning
          </Button>
        </MediaCard>
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
        {!selectedItems ||
          (selectedItems.length === 0 && (
            <ListActionButton icon="playlist-add" label="Add To Playlist" actionCb={() => addToPlaylist({ playlistId })} />
          ))}
        {selectedItems && selectedItems.length > 0 && (
          <ActionButtons actionCb={confirmDelete} cancelCb={cancelDelete} actionLabel="Remove" cancelLabel="Cancel" rightIcon="delete" />
        )}
      </PageActions>
      {!selectedItems ||
        (selectedItems.length === 0 && (
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
            onPress={() => {
              clearCheckboxSelection();
              resetData();
            }}
          />
        ))}
    </PageContainer>
  );

  function withIds(mediaIds: string[]) {
    return dispatch(
      updateUserPlaylist({
        title: title,
        mediaIds,
        description: description,
        category: category as any,
        _id: selectedPlaylist._id,
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
    const randomKey = Math.random();
    setClearSelectionKey(randomKey);
  }

  // const [selected, setSelected] = useState(selectedItems.size);
  function onAddItem(item: MediaItem) {
    // setSelected(selectedItems.size);
    const updatedItems = selectedItems.concat([item._id]);
    setSelectedItems(updatedItems);
  }

  function onRemoveItem(selected: MediaItem) {
    const updatedItems = selectedItems.filter((item) => item !== selected._id);
    setSelectedItems(updatedItems);
  }

  async function confirmDelete() {
    await saveMediaUpdates();
    clearCheckboxSelection();
    resetData();
  }

  async function cancelDelete() {
    clearCheckboxSelection();
    resetData();
  }

  // TODO: We have to do this automatically, and on!
  /* async function save() {
    await withIds(selectedPlaylist.mediaIds);
    setIsLoaded(false);
    await loadData();
  } */

  async function saveMediaUpdates() {
    const mediaIds = selectedPlaylist.mediaIds || [];
    const filtered = mediaIds.filter((id) => !selectedItems.includes(id));

    await withIds(filtered);
    setIsLoaded(false);
    // startLoad();
    await loadData();
  }

  function resetData() {
    setSelectedItems([]);
  }

  async function editPlaylist() {
    edit({ playlistId });
  }

  async function deletePlaylist() {
    console.log('dispatch', playlistId);
    await dispatch(removeUserPlaylist(playlistId));
    await playlists();
  }
};

export default withLoadingSpinner(PlaylistDetail);
