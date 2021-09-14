import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { findUserPlaylists, getPlaylistById, updateUserPlaylist } from '../../state/modules/playlists';

import { MediaItem, UpdatePlaylistDtoCategoryEnum } from '../../rxjs-api';

import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ActionSheet } from 'native-base';

import { useViewMediaItem } from '../../hooks/NavigationHooks';
import { useSpinner } from '../../hooks/useSpinner';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { ActionButtons } from '../layout/ActionButtons';
import { MediaList } from '../layout/MediaList';
import { MediaCard } from '../layout/MediaCard';
import { PageContainer } from '../layout/PageContainer';
// import { ListActionButton } from '../layout/ListActionButton';

export interface PlaylistEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}

const PlaylistEdit = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { playlistId } = route.params;

  const [loaded, setLoaded] = useState(false);
  const playlist = useAppSelector((state) => state.playlist);
  const [{ AppSpinner, isLoading, endLoad, startLoad }] = useSpinner({ loadingState: true });
  const { selectedPlaylist } = playlist;
  const [title, setTitle] = useState(selectedPlaylist?.title);
  const [description, setDescription] = useState(selectedPlaylist?.description);
  const [category, setCategory] = useState(selectedPlaylist?.category);

  const [selectedItems, setSelectedItems] = useState([]);

  // const [selectedItems] = useState(new Set<string>());

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
  }, [loaded, dispatch, playlistId]);

  const options = [];

  for (const value in UpdatePlaylistDtoCategoryEnum) {
    options.push(value);
  }

  const onViewMediaItemClicked = useViewMediaItem();

  const items = selectedPlaylist?.mediaItems || [];
  const author = '';

  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';

  return (
    <PageContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <MediaCard
            title={title}
            author={author}
            description={description}
            category={category}
            categoryOptions={options}
            onCategoryChange={(e: any) => {
              setCategory(e);
            }}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            isEdit={true}
          />
        </View>
      </TouchableWithoutFeedback>
      {/* selectedItems.length > 0 && (
        <ListActionButton danger={false} icon="delete-outline" actionCb={() => showCardMenu(selectedItems.length)} label={'Remove Items from Playlist'} />
      ) */}
      <MediaList
        onViewDetail={(itm) => onViewMediaItemClicked({ mediaId: itm._id, uri: itm.uri })}
        list={items}
        isSelectable={true}
        removeItem={onRemoveItem}
        addItem={onAddItem}
        showThumbnail={true}
      />
      <ActionButtons rightIcon={'check-circle'} actionCb={() => save()} cancelCb={cancelCb} actionLabel={actionLabel} cancelLabel={cancelLabel} />
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
    setLoaded(true);
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

  async function save() {
    await withIds(selectedPlaylist.mediaIds);
    setLoaded(false);
    await loadData();
  }

  async function saveMediaUpdates() {
    const filtered = selectedPlaylist.mediaIds.filter((id) => !selectedItems.includes(id));

    await withIds(filtered);
    setLoaded(false);
    startLoad();
    await loadData();
  }

  function resetData() {
    setSelectedItems([]);
  }

  function cancelCb() {
    navigation.goBack();
    resetData();
  }

  function showCardMenu() {
    ActionSheet.show(
      {
        options: ['Cancel', 'Remove'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
      },
      (buttonIdx) => {
        switch (buttonIdx) {
          case 0:
            console.log(1);
            break;
          case 1:
            saveMediaUpdates().then(() => {});
            break;
        }
      }
    );
  }
};

export default withLoadingSpinner(PlaylistEdit);
