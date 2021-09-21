import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { getPlaylistById, removeUserPlaylist, updateUserPlaylist } from '../../state/modules/playlists';

import { usePlaylists, useRouteWithParams, useViewMediaItem } from '../../hooks/NavigationHooks';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { Button, FAB } from 'react-native-paper';

import { PlaylistCard } from '../layout/PlaylistCard';
import { MediaList } from '../layout/MediaList';
import { ListActionButton } from '../layout/ListActionButton';
import { PageContainer, PageContent, PageActions, PageProps } from '../layout/PageContainer';

import { theme } from '../../styles';
import AppDialog from '../layout/AppDialog';
import { MediaItem } from '../../rxjs-api';
import { ActionButtons } from '../layout/ActionButtons';

export const PlaylistDetail = ({ route, onDataLoaded }: PageProps) => {
  const { playlistId = '' } = route?.params || {};

  const onEditClicked = useRouteWithParams(ROUTES.playlistEdit);
  const onAddToPlaylistClicked = useRouteWithParams(ROUTES.addItemsToPlaylist);
  const onViewMediaItemClicked = useViewMediaItem();
  const playlists = usePlaylists();

  const dispatch = useDispatch();

  const selectedPlaylist = useAppSelector((state) => state.playlist.selectedPlaylist);
  const loaded = useAppSelector((state) => state);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoaded, setIsLoaded] = useState(!!loaded);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (!isLoaded) {
      loadData().then(onDataLoaded);
      console.log(selectedPlaylist);
    }
  }, [isLoaded, dispatch, onDataLoaded, loaded, selectedPlaylist]);

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [
    { icon: 'delete', onPress: () => setShowDialog(true), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.error } },
    { icon: 'edit', onPress: () => editPlaylist(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.accent } },
  ];

  const [clearSelectionKey, setClearSelectionKey] = useState(Math.random());
  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  const { description = '', title = '', imageSrc, category, mediaItems = [] } = selectedPlaylist || {};

  const items = mediaItems || [];
  // const author = user?.username;

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
        <PlaylistCard
          title={title}
          description={description}
          showSocial={true}
          showActions={false}
          showThumbnail={true}
          image={imageSrc}
          onEditClicked={() => onEditClicked({ playlistId })}
          // onDeleteClicked={onDeleteClicked}
          category={category}
        >
          <Button icon="live-tv" color={theme.colors.primary} mode={'outlined'} style={{ width: '100%', marginBottom: 10 }} compact>
            Play From Beginning
          </Button>
        </PlaylistCard>
        <MediaList
          key={clearSelectionKey}
          onViewDetail={(item) => onViewMediaItemClicked({ mediaId: item._id, uri: item.uri })}
          list={items}
          showThumbnail={true}
          isSelectable={true}
          showActions={!selectedItems || selectedItems.length === 0}
          removeItem={onRemoveItem}
          addItem={onAddItem}
        />
      </PageContent>
      <PageActions>
        {!selectedItems ||
          (selectedItems.length === 0 && (
            <ListActionButton icon="playlist-add" label="Add To Playlist" actionCb={() => onAddToPlaylistClicked({ playlistId })} />
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
      })
    );
  }

  async function loadData() {
    await dispatch(getPlaylistById(playlistId));
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
    const filtered = selectedPlaylist.mediaIds.filter((id) => !selectedItems.includes(id));

    await withIds(filtered);
    setIsLoaded(false);
    // startLoad();
    await loadData();
  }

  function resetData() {
    setSelectedItems([]);
  }

  async function editPlaylist() {
    onEditClicked({ playlistId });
  }

  async function deletePlaylist() {
    console.log('dispatch', playlistId);
    await dispatch(removeUserPlaylist(playlistId));
    await playlists();
  }
};

export default withLoadingSpinner(PlaylistDetail);
