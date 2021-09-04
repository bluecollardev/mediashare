import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { ActionSheet, Container, Text, View } from 'native-base';

import { ActionButtons } from '../../layout/ActionButtons';

import { MediaList, MediaListType } from '../../layout/MediaList';
import { usePageRoute, useRouteName, useRouteWithParams, useViewMediaItem } from '../../../hooks/NavigationHooks';
import { MediaCard } from '../../layout/MediaCard';

import { useAppSelector } from '../../../state';
import { findUserPlaylists, getPlaylistById, updateUserPlaylist } from '../../../state/modules/playlists';

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
  const [title, setTitle] = useState(selectedPlaylist?.title);
  const [description, setDescription] = useState(selectedPlaylist?.description);
  const [category, setCategory] = useState(UpdatePlaylistDtoCategoryEnum.Builder);

  const [selectedItems] = useState(new Set<string>(selectedPlaylist?.mediaItems.map((item) => item._id)));

  // const [selectedItems] = useState(new Set<string>());

  const loadData = async function () {
    await dispatch(getPlaylistById(playlistId));

    setLoaded(true);
  };

  const [selected, setSelected] = useState(selectedItems.size);
  const onAddItem = (item: MediaItem) => {
    console.log('🚀 -------------------------------------------------------');
    console.log('🚀 ~ file: index.tsx ~ line 52 ~ onAddItem ~ item', item);
    console.log('🚀 -------------------------------------------------------');
    selectedItems.delete(item._id);
    console.log(selectedItems.keys);
    setSelected(selectedItems.size);
  };

  const onRemoveItem = (item: MediaItem) => {
    selectedItems.add(item._id);
    console.log(selectedItems.size);
    setSelected(selectedItems.size);
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
  const save = async function () {
    console.log(items);

    const result = await dispatch(
      updateUserPlaylist({
        title: title,
        mediaIds: Array.from(selectedItems.keys()),
        description: description,
        category,
        _id: selectedPlaylist._id,
      })
    );

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

  const cancelCb = navigation.goBack;
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
            save();
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
                console.log(category);
              }}
              onTitleChange={(e) => setTitle(e)}
              onDescriptionChange={(e) => setDescription(e)}
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
      />
      {selected === selectedPlaylist?.mediaItems?.length ? (
        <ActionButtons actionCb={() => save()} cancelCb={cancelCb} actionLabel={actionLabel} cancelLabel={cancelLabel} />
      ) : (
        <ListActionButton danger={true} icon="trash" actionCb={() => showCardMenu(selectedItems.size)} label={'Remove Items from Playlist'} />
      )}
    </Container>
  );
};

export default PlaylistEditContainer;
