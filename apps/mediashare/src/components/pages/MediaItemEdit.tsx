import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { createThumbnail, getMediaItemById, updateMediaItem } from '../../state/modules/media-items';

import { CreateMediaItemDtoCategoryEnum, CreatePlaylistDtoCategoryEnum, UpdateMediaItemDto, UpdateMediaItemDtoCategoryEnum } from '../../rxjs-api';

import { ROUTES } from '../../routes';
import { useRouteWithParams } from '../../hooks/NavigationHooks';

import { View, ScrollView, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { ActionButtons } from '../layout/ActionButtons';
import { MediaCard } from '../layout/MediaCard';
import { PageContainer } from '../layout/PageContainer';

import styles from '../../styles';
import { useSpinner } from '../../hooks/useSpinner';
import { findUserPlaylists } from '../../state/modules/playlists';

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
    const dto: UpdateMediaItemDto & { _id } = {
      title,
      category: CreatePlaylistDtoCategoryEnum[category as any],
      description,
      isPlayable: true,
      _id: mediaId,
      // key: title,
      // eTag: '',
    };

    await dispatch(updateMediaItem(dto));
    goToItem({ mediaId, uri });
  };

  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';

  return (
    <PageContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <ScrollView>
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
            </ScrollView>
            <View>
              <ActionButtons actionCb={saveItem} cancelCb={cancelCb} rightIcon="check-circle" actionLabel={actionLabel} cancelLabel={cancelLabel} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

export default MediaItemEditContainer;
