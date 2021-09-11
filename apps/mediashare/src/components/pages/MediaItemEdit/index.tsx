import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ActionSheet, Button, CardItem, Container, Icon, Text, View } from 'native-base';

import styles from '../../../styles';
import { useAppSelector } from '../../../state';
import { CreateMediaItemDtoCategoryEnum, CreatePlaylistDtoCategoryEnum, UpdateMediaItemDto, UpdateMediaItemDtoCategoryEnum } from '../../../rxjs-api';
import { MediaCard } from '../../layout/MediaCard';
import { createThumbnail, getMediaItemById, updateMediaItem } from '../../../state/modules/media-items';
import { Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { ActionButtons } from '../../layout/ActionButtons';
import { useRouteWithParams } from '../../../hooks/NavigationHooks';
import { ROUTES } from '../../../routes';
import AppContent from '../../layout/AppContent';
import PageContainer from '../../layout/PageContainer';

export interface MediaItemEditProps {
  navigation: any;
  list: any;
}

export const MediaItemEdit = ({ navigation }: { navigation: any }) => {
  const options = [];
  for (const value in UpdateMediaItemDtoCategoryEnum) {
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

  const { mediaId, uri } = route?.params || {};
  const { mediaItem, loaded } = useAppSelector((state) => state.mediaItem);
  const [isLoaded, setIsLoaded] = useState(loaded);
  const mediaItemSrc = useAppSelector((state) => state.mediaItem.mediaSrc);
  const { _id } = mediaItem || {};

  useEffect(() => {
    if (!isLoaded || _id !== mediaId) {
      dispatch(getMediaItemById({ uri, mediaId }));

      setIsLoaded(true);
    }
  }, [dispatch, isLoaded, uri, mediaId, _id]);

  const [title, setTitle] = useState(mediaItem?.title);
  const [description, setDescription] = useState(mediaItem?.description);
  const [category, setCategory] = useState();

  const goToItem = useRouteWithParams(ROUTES.mediaItemDetail);

  const options = [];
  for (const value in CreateMediaItemDtoCategoryEnum) {
    options.push(value);
  }

  const author = '';

  const resetData = () => {};
  const cancelCb = () => {
    navigation.goBack();
    resetData();
  };
  const saveItem = async function () {
    console.log(mediaItem);
    const dto: UpdateMediaItemDto & { _id } = {
      title,
      category: CreatePlaylistDtoCategoryEnum[category as any],
      description,
      isPlayable: true,
      _id: mediaId,
      // key: title,
      // eTag: '',
    };
    console.log(dto);
    const res = await dispatch(updateMediaItem(dto));

    // goToItem({ mediaId, uri });
  };
  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';

  if (!mediaItem) {
    return <Text>Loading</Text>;
  }
  return (
    <PageContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View padder>
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
              isEdit={true}
            />
          </View>
        </TouchableWithoutFeedback>
        <ActionButtons actionCb={saveItem} cancelCb={cancelCb} actionLabel={actionLabel} cancelLabel={cancelLabel} />
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

export default MediaItemEditContainer;
