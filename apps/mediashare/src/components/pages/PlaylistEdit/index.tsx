import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ActionSheet } from 'native-base';

import { ActionButtons } from '../../layout/ActionButtons';

import { MediaList } from '../../layout/MediaList';
import { useViewMediaItem } from '../../../hooks/NavigationHooks';
import { MediaCard } from '../../layout/MediaCard';

import { useAppSelector } from '../../../state';
import { getPlaylistById, updateUserPlaylist } from '../../../state/modules/playlists';

import { ListActionButton } from '../../layout/ListActionButton';

import { MediaItem, UpdatePlaylistDtoCategoryEnum } from '../../../rxjs-api';

import PageContainer from '../../layout/PageContainer';
import { useSpinner } from '../../../hooks/useSpinner';
import AppContent from '../../layout/AppContent';

export interface PlaylistEditProps {
  navigation: any;
  list: any;
}

export interface PlaylistEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}

export interface PlaylistEditContainerState {}

const PlaylistEditContainer = ({ navigation, route }) => {
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

  const loadData = async function () {
    await dispatch(getPlaylistById(playlistId));

    setLoaded(true);
  };

  // const [selected, setSelected] = useState(selectedItems.size);
  const onAddItem = (item: MediaItem) => {
    // setSelected(selectedItems.size);
    const updatedItems = selectedItems.concat([item._id]);
    setSelectedItems(updatedItems);
  };

  const onRemoveItem = (selected: MediaItem) => {
    const updatedItems = selectedItems.filter((item) => item !== selected._id);

    setSelectedItems(updatedItems);
  };

  const options = [];
  for (const value in UpdatePlaylistDtoCategoryEnum) {
    options.push(value);
  }

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
  const withIds = function (mediaIds: string[]) {
    return dispatch(
      updateUserPlaylist({
        title: title,
        mediaIds,
        description: description,
        category: category as any,
        _id: selectedPlaylist._id,
      })
    );
  };
  const save = async function () {
    const result = await withIds(selectedPlaylist.mediaIds);
    setLoaded(false);
    await loadData();
  };
  const saveMediaUpdates = async function () {
    const filtered = selectedPlaylist.mediaIds.filter((id) => !selectedItems.includes(id));

    const result = await withIds(filtered);
    setLoaded(false);
    startLoad();
    await loadData();
  };
  const onViewMediaItemClicked = useViewMediaItem();

  // const {username} = useAppSelector((state) => state.user)

  const items = selectedPlaylist?.mediaItems || [];
  const author = '';

  const resetData = () => {
    setSelectedItems([]);
  };
  const cancelCb = () => {
    navigation.goBack();
    resetData();
  };
  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';
  const showCardMenu = function (count: number) {
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
            saveMediaUpdates();
            break;
        }
      }
    );
  };
  if (isLoading || !loaded) {
    return <AppSpinner />;
  }
  return (
    <PageContainer>
      <AppSpinner />
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
      {selectedItems.length > 0 && (
        <ListActionButton danger={false} icon="delete-outline" actionCb={() => showCardMenu(selectedItems.length)} label={'Remove Items from Playlist'} />
      )}
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
};

export default PlaylistEditContainer;
