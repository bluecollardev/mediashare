import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ActionSheet, Container, Text, View } from 'native-base';

import styles from '../../../styles';
import { useAppSelector } from '../../../state';
import { CreatePlaylistDtoCategoryEnum, MediaItem, UpdatePlaylistDtoCategoryEnum } from '../../../rxjs-api';
import { MediaCard } from '../../layout/MediaCard';
import { getPlaylistById, updateUserPlaylist } from '../../../state/modules/playlists';
import { useViewMediaItem } from '../../../hooks/NavigationHooks';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { MediaList } from '../../layout/MediaList';
import { ActionButtons } from '../../layout/ActionButtons';
import { ListActionButton } from '../../layout/ListActionButton';

export interface MediaItemEditProps {
  navigation: any;
  list: any;
}

export const MediaItemEdit = ({ navigation }: { navigation: any }) => {
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

export interface MediaItemEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}

export interface MediaItemEditContainerState {}

const MediaItemEditContainer = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { mediaId } = route.params;

  const [loaded, setLoaded] = useState(false);
  const media = useAppSelector((state) => state.media);
  // const initCategory = useAppSelector((state) => state.media?.selectedPlaylist?.category) || UpdatePlaylistDtoCategoryEnum.Builder;
  const { selectedPlaylist } = media;
  console.log(selectedPlaylist);
  const [title, setTitle] = useState(selectedPlaylist?.title);
  const [description, setDescription] = useState(selectedPlaylist?.description);
  const [category, setCategory] = useState();

  const [selectedItems, setSelectedItems] = useState([]);

  // const [selectedItems] = useState(new Set<string>());

  const loadData = async function () {
    await dispatch(getPlaylistById(mediaId));

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
      dispatch(getPlaylistById(mediaId));
      setLoaded(true);
    }
  }, [loaded, dispatch, mediaId]);
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

    const result = await withIds(filtered);
    console.log(result);
    setLoaded(false);
    await loadData();
  };
  const onViewMediaItemClicked = useViewMediaItem();
  if (!mediaId || !loaded) {
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

export default MediaItemEditContainer;
