import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { getPlaylistById, updateUserPlaylist } from '../../state/modules/playlists';

import { MediaItem, UpdatePlaylistDtoCategoryEnum } from '../../rxjs-api';

import { useRouteWithParams, useViewMediaItem } from '../../hooks/NavigationHooks';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { Button } from 'react-native-paper';
import { ActionButtons } from '../layout/ActionButtons';
import { MediaList } from '../layout/MediaList';
import { MediaCard } from '../layout/MediaCard';
import { PageContainer, PageContent, PageActions, PageProps } from '../layout/PageContainer';
import { ROUTES } from '../../routes';
import * as DocumentPicker from 'expo-document-picker';
import { createThumbnail } from '../../state/modules/media-items';
import { theme } from '../../styles';

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

  const [documentUri, setDocumentUri] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const mediaSrc =
    useAppSelector((state) => state.mediaItem.getMediaItem) ||
    'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.us-west-2.amazonaws.com/public/temp/background-comp.jpg';
  const mediaItem = useAppSelector((state) => state.mediaItem.mediaItem);
  const mediaItemSrc = useAppSelector((state) => state.mediaItem.mediaSrc);

  useEffect(() => {
    if (!isLoaded) {
      loadData().then(onDataLoaded);
    }
  }, [isLoaded, dispatch, onDataLoaded]);

  const options = [];
  for (const value in UpdatePlaylistDtoCategoryEnum) {
    options.push(value);
  }

  const onViewMediaItemClicked = useViewMediaItem();

  const [clearSelectionKey, setClearSelectionKey] = useState(Math.random());
  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  const items = selectedPlaylist?.mediaItems || [];
  const author = '';

  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';

  return (
    <PageContainer>
      <PageContent>
        <MediaCard
          title={title}
          author={author}
          description={description}
          mediaSrc={mediaItemSrc}
          category={category}
          categoryOptions={options}
          onCategoryChange={(e: any) => {
            setCategory(e);
          }}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          // showThumbnail={true}
          // mediaSrc={thumbnail}
          isEdit={true}
          isReadOnly={selectedItems && selectedItems.length > 0}
        >
          <Button
            icon="cloud-upload"
            color={theme.colors.primary}
            dark
            mode={'contained'}
            style={{ width: '100%', marginBottom: 10 }}
            onPress={getDocument}
            compact
          >
            Upload Cover Image / Video
          </Button>
        </MediaCard>

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
          isSelectable={true}
          showActions={!selectedItems || selectedItems.length === 0}
          removeItem={onRemoveItem}
          addItem={onAddItem}
          showThumbnail={true}
        />
      </PageContent>
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

  // async function save() {
  //   await withIds(selectedPlaylist.mediaIds);
  //   setIsLoaded(false);
  //   await loadData();
  //   playlists();
  // }

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

  function cancelCb() {
    navigation.goBack();
    resetData();
  }

  async function getDocument() {
    const document = (await DocumentPicker.getDocumentAsync({ type: 'video/mp4' })) as any;
    if (!document) {
      return;
    }
    console.log(document);
    setDocumentUri(document?.uri || '');
    startLoad();

    const thumbnail = await dispatch(createThumbnail({ key: document.name, fileUri: document.uri }));
    console.log(thumbnail);
    endLoad();
  }
};

export default withLoadingSpinner(PlaylistEdit);
