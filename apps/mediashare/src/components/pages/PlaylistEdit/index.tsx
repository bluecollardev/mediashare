import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { ActionSheet, Container, Text, View } from 'native-base';

import { ActionButtons } from '../../layout/ActionButtons';

import { MediaList } from '../../layout/MediaList';
import { useViewMediaItem } from '../../../hooks/NavigationHooks';
import { MediaCard } from '../../layout/MediaCard';

import { useAppSelector } from '../../../state';
import { getPlaylistById, updateUserPlaylist } from '../../../state/modules/playlists';

import { ListActionButton } from '../../layout/ListActionButton';

import { CreatePlaylistDtoCategoryEnum, MediaItem, UpdatePlaylistDtoCategoryEnum } from '../../../rxjs-api';

import styles from '../../../styles';

const validate = (values) => {
  const error = {} as any;
  error.email = '';
  error.name = '';
  let ema = values.email;
  let nm = values.name;
  if (values.email === undefined) {
    ema = '';
  }
  if (values.name === undefined) {
    nm = '';
  }
  if (ema.length < 8 && ema !== '') {
    error.email = 'too short';
  }
  if (!ema.includes('@') && ema !== '') {
    error.email = '@ not included';
  }
  if (nm.length > 8) {
    error.name = 'max 8 characters';
  }
  return error;
};

export interface PlaylistEditProps {
  navigation: any;
  list: any;
}

export const PlaylistEdit = ({ navigation }: { navigation: any }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const { title, description } = useAppSelector((state) => state.createPlaylist);
  const dispatch = useDispatch();
  const options = [];
  for (const value in CreatePlaylistDtoCategoryEnum) {
    options.push(value);
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    <MediaCard categoryOptions={options}>
      <View padder />
    </MediaCard>
  );
};

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
  // const initCategory = useAppSelector((state) => state.playlist?.selectedPlaylist?.category) || UpdatePlaylistDtoCategoryEnum.Builder;
  const { selectedPlaylist } = playlist;
  console.log(selectedPlaylist);
  const [title, setTitle] = useState(selectedPlaylist?.title);
  const [description, setDescription] = useState(selectedPlaylist?.description);
  const [category, setCategory] = useState();

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
    console.log(selectedItems);
  }, [selectedItems]);
  useEffect(() => {
    if (!loaded) {
      dispatch(getPlaylistById(playlistId));
      setLoaded(true);
    }
  }, [loaded, dispatch, playlistId]);
  const withIds = function (mediaIds: string[]) {
    return dispatch(
      updateUserPlaylist({
        title: title,
        mediaIds,
        description: description,
        category,
        _id: selectedPlaylist._id,
      })
    );
  };
  const save = async function () {
    const result = await withIds(selectedPlaylist.mediaIds);
    console.log(result);
    setLoaded(false);
    await loadData();
  };
  const saveMediaUpdates = async function () {
    const filtered = selectedPlaylist.mediaIds.filter((id) => !selectedItems.includes(id));
    console.log('🚀 -----------------------------------------------------------------------');
    console.log('🚀 ~ file: index.tsx ~ line 144 ~ saveMediaUpdates ~ filtered', filtered);
    console.log('🚀 -----------------------------------------------------------------------');
    const result = await withIds(filtered);
    console.log(result);
    setLoaded(false);
    await loadData();
  };
  const onViewMediaItemClicked = useViewMediaItem();
  if (!playlistId || !loaded) {
    return <Text>Item not found</Text>;
  }

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
  if (!selectedPlaylist) {
    return <Text>Loading</Text>;
  }
  return (
    <Container style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View padder>
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
      </KeyboardAvoidingView>

      <MediaList
        onViewDetail={(itm) => onViewMediaItemClicked({ mediaId: itm._id, uri: itm.uri })}
        list={items}
        isSelectable={true}
        removeItem={onRemoveItem}
        addItem={onAddItem}
        showThumbnail={true}
      />
      {selectedItems.length < 1 ? (
        <ActionButtons rightIcon={'check-bold'} actionCb={() => save()} cancelCb={cancelCb} actionLabel={actionLabel} cancelLabel={cancelLabel} />
      ) : (
        <ListActionButton danger={false} icon="trash" actionCb={() => showCardMenu(selectedItems.length)} label={'Remove Items from Playlist'} />
      )}
    </Container>
  );
};

export default PlaylistEditContainer;
