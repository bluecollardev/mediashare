import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../store';
import { getPlaylistById, updateUserPlaylist } from '../../store/modules/playlists';

import { PlaylistCategoryType, MediaItem } from '../../rxjs-api';

import { usePlaylists, useRouteWithParams, useViewMediaItem } from '../../hooks/NavigationHooks';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { View, Text } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { AppUpload } from '../layout/AppUpload';
import { ActionButtons } from '../layout/ActionButtons';
import { MediaList } from '../layout/MediaList';
import { MediaCard } from '../layout/MediaCard';
import { PageContainer, KeyboardAvoidingPageContent, PageActions, PageProps } from '../layout/PageContainer';
import { ROUTES } from '../../routes';

import { createRandomRenderKey } from '../../core/utils';

import { theme } from '../../styles';
import { UploadPlaceholder } from '../layout/UploadPlaceholder';

const actionModes = { delete: 'delete', default: 'default' };

const PlaylistEdit = ({ navigation, route }: PageProps) => {
  const addToPlaylist = useRouteWithParams(ROUTES.addItemsToPlaylist);
  const viewMediaItem = useViewMediaItem();
  const goToPlaylists = usePlaylists();

  const dispatch = useDispatch();

  const { playlistId } = route.params;

  const { loaded, selected } = useAppSelector((state) => state.playlist);
  const [isLoaded, setIsLoaded] = useState(loaded);
  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);

  const [title, setTitle] = useState(selected?.title);
  const [description, setDescription] = useState(selected?.description);
  const [category, setCategory] = useState(selected?.category);
  const [selectedItems, setSelectedItems] = useState([]);
  // @ts-ignore
  const [imageSrc, setImageSrc] = useState(selected?.imageSrc);

  useEffect(() => {
    if (!isLoaded) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const options = [];
  for (const value in PlaylistCategoryType) {
    options.push(value);
  }

  const [clearSelectionKey, setClearSelectionKey] = useState(createRandomRenderKey());

  const onUpload = (uri: string) => {
    setImageSrc(uri);
  };

  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  // @ts-ignore
  const items = selected?.mediaItems || [];
  const author = '';

  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
        <MediaCard
          title={title}
          author={author}
          description={description}
          showThumbnail={true}
          thumbnail={imageSrc}
          category={category}
          categoryOptions={options}
          onCategoryChange={(e: any) => {
            setCategory(e);
          }}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          isEdit={true}
          isReadOnly={selectedItems && selectedItems.length > 0}
          topDrawer={() =>
            imageSrc ? (
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Button icon="delete-forever" mode="text" dark color={theme.colors.error} onPress={() => console.log('Do something!')} compact>
                    {' '}
                  </Button>
                </View>
                <View style={{ flex: 4 }}>
                  <AppUpload uploadMode="photo" onUpload={onUpload}>
                    <Button icon="cloud-upload" mode="outlined" dark color={theme.colors.default} compact>
                      <Text>Change Cover Photo</Text>
                    </Button>
                  </AppUpload>
                </View>
              </View>
            ) : (
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <AppUpload uploadMode="photo" onUpload={onUpload}>
                    <UploadPlaceholder buttonText="Add Cover Photo" />
                  </AppUpload>
                </View>
              </View>
            )
          }
        />
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
          <IconButton
            icon="rule"
            color={isSelectable ? theme.colors.primary : theme.colors.disabled}
            style={{ flex: 0, width: 28, marginTop: 10, marginBottom: 10, marginRight: 10 }}
            onPress={() => (!isSelectable ? activateDeleteMode() : cancelDeletePlaylistItems())}
          />
          <Button
            icon="playlist-add"
            color={theme.colors.accent}
            mode="contained"
            style={{ flex: 1, marginTop: 10, marginBottom: 10 }}
            onPress={() => addToPlaylist({ playlistId })}
            disabled={actionMode === actionModes.delete}
            compact
            dark
          >
            Add To Playlist
          </Button>
        </View>
        <MediaList
          key={clearSelectionKey}
          onViewDetail={(item) => viewMediaItem({ mediaId: item._id, uri: item.uri })}
          list={items}
          selectable={isSelectable}
          showActions={!isSelectable}
          removeItem={onRemoveItem}
          addItem={onAddItem}
          showThumbnail={true}
        />
      </KeyboardAvoidingPageContent>
      <PageActions>
        {!isSelectable && (
          <ActionButtons actionCb={() => savePlaylist()} cancelCb={cancelCb} actionLabel={actionLabel} cancelLabel={cancelLabel} rightIcon={'check-circle'} />
        )}
        {isSelectable && (
          <ActionButtons
            actionCb={confirmDeletePlaylistItems}
            cancelCb={cancelDeletePlaylistItems}
            actionLabel="Remove"
            cancelLabel="Cancel"
            rightIcon="delete"
            rightIconColor={theme.colors.error}
          />
        )}
      </PageActions>
    </PageContainer>
  );

  async function saveWithIds(mediaIds: string[]) {
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

  function onRemoveItem(selected: MediaItem) {
    const updatedItems = selectedItems.filter((item) => item !== selected._id);
    setSelectedItems(updatedItems);
  }

  async function activateDeleteMode() {
    setActionMode(actionModes.delete);
    setIsSelectable(true);
  }

  async function confirmDeletePlaylistItems() {
    await savePlaylistItems();
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
    resetData();
  }

  async function cancelDeletePlaylistItems() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
    resetData();
  }

  async function savePlaylist() {
    // @ts-ignore
    const mediaIds = selected.mediaItems.map((item) => item._id) || [];
    if (isSelectable) {
      const filtered = mediaIds.filter((id) => !selectedItems.includes(id));
      await saveWithIds(filtered);
    } else {
      await saveWithIds(mediaIds);
    }

    setIsLoaded(false);
    // await loadData();
    goToPlaylists();
  }

  async function savePlaylistItems() {
    // @ts-ignore
    const mediaIds = selected.mediaItems.map((item) => item._id) || [];
    if (isSelectable) {
      const filtered = mediaIds.filter((id) => !selectedItems.includes(id));
      await saveWithIds(filtered);
    } else {
      await saveWithIds(mediaIds);
    }

    setIsLoaded(false);
    // await loadData();
  }

  function resetData() {
    setSelectedItems([]);
  }

  function cancelCb() {
    navigation.goBack();
    resetData();
  }
};

export default withLoadingSpinner(PlaylistEdit);
