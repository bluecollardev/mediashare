import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { getPlaylistById, updateUserPlaylist } from '../../state/modules/playlists';

import { MediaItem } from '../../rxjs-api';

import { useRouteWithParams, useViewMediaItem } from '../../hooks/NavigationHooks';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { AppUpload } from '../layout/AppUpload';
import { ActionButtons } from '../layout/ActionButtons';
import { MediaList } from '../layout/MediaList';
import { MediaCard } from '../layout/MediaCard';
import { PageContainer, KeyboardAvoidingPageContent, PageActions, PageProps } from '../layout/PageContainer';
import { ROUTES } from '../../routes';

import { theme } from '../../styles';
import { PlaylistCategoryType } from '../../rxjs-api/models/PlaylistCategoryType';

const PlaylistEdit = ({ navigation, route, onDataLoaded, startLoad, endLoad }: PageProps) => {
  const onAddToPlaylistClicked = useRouteWithParams(ROUTES.addItemsToPlaylist);

  const dispatch = useDispatch();

  const { playlistId } = route.params;

  const { loaded, selectedPlaylist } = useAppSelector((state) => state.playlist);
  const [isLoaded, setIsLoaded] = useState(loaded);

  const [title, setTitle] = useState(selectedPlaylist?.title);
  const [description, setDescription] = useState(selectedPlaylist?.description);
  const [category, setCategory] = useState(selectedPlaylist?.category);
  const [selectedItems, setSelectedItems] = useState([]);
  const [imageSrc, setImageSrc] = useState(selectedPlaylist?.imageSrc);

  useEffect(() => {
    if (!isLoaded) {
      loadData().then(onDataLoaded);
    }
  }, [isLoaded, dispatch, onDataLoaded]);

  const options = [];
  for (const value in PlaylistCategoryType) {
    options.push(value);
  }

  const onViewMediaItemClicked = useViewMediaItem();

  const [clearSelectionKey, setClearSelectionKey] = useState(Math.random());

  const onUpload = (uri: string) => {
    setImageSrc(uri);
  };

  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  const items = selectedPlaylist?.mediaItems || [];
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
          topDrawer={() => (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Button icon="delete" mode="text" dark color={theme.colors.error} onPress={() => console.log('Do something!')} compact>
                  {' '}
                </Button>
              </View>
              <View style={{ flex: 4 }}>
                <AppUpload startLoad={startLoad} endLoad={endLoad} onUpload={onUpload}>
                  <Button icon="cloud-upload" mode="outlined" dark color={theme.colors.accentDarker} compact>
                    Change Cover Photo
                  </Button>
                </AppUpload>
              </View>
            </View>
          )}
        />

        {!selectedItems ||
          (selectedItems.length === 0 && (
            <Button
              icon="playlist-add"
              color={theme.colors.primary}
              mode={'outlined'}
              style={{ width: '100%', marginTop: 10 }}
              onPress={() => onAddToPlaylistClicked({ playlistId })}
              compact
            >
              Add To Playlist
            </Button>
          ))}
        <MediaList
          key={clearSelectionKey}
          onViewDetail={(item) => onViewMediaItemClicked({ mediaId: item._id, uri: item.uri })}
          list={items}
          selectable={true}
          showActions={!selectedItems || selectedItems.length === 0}
          removeItem={onRemoveItem}
          addItem={onAddItem}
          showThumbnail={true}
        />
      </KeyboardAvoidingPageContent>
      <PageActions>
        {!selectedItems ||
          (selectedItems.length === 0 && (
            <ActionButtons
              actionCb={() => saveMediaUpdates()}
              cancelCb={cancelCb}
              actionLabel={actionLabel}
              cancelLabel={cancelLabel}
              rightIcon={'check-circle'}
            />
          ))}
        {selectedItems && selectedItems.length > 0 && (
          <ActionButtons actionCb={confirmDelete} cancelCb={cancelDelete} actionLabel="Remove" cancelLabel="Cancel" rightIcon="delete" />
        )}
      </PageActions>
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

  function cancelCb() {
    navigation.goBack();
    resetData();
  }
};

export default withLoadingSpinner(PlaylistEdit);
