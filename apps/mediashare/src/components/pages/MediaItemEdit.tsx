import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { updateMediaItem } from '../../state/modules/media-items';

import { CreateMediaItemDtoCategoryEnum, CreatePlaylistDtoCategoryEnum, UpdateMediaItemDto } from '../../rxjs-api';
import { useRouteWithParams, useMediaItems } from '../../hooks/NavigationHooks';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { View, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { ActionButtons } from '../layout/ActionButtons';
import { MediaCard } from '../layout/MediaCard';
import { PageContainer, PageProps } from '../layout/PageContainer';

import styles from '../../styles';
import { FAB, Paragraph } from 'react-native-paper';

export interface MediaItemEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}

export interface MediaItemEditContainerState {}

const MediaItemEdit = ({ navigation, route }: PageProps) => {
  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';
  const options = [];
  for (const value in CreateMediaItemDtoCategoryEnum) {
    options.push(value);
  }

  const dispatch = useDispatch();

  const { mediaId, uri } = route?.params || {};
  const mediaItem = useAppSelector((state) => state.mediaItem.mediaItem);

  const mediaItemSrc = useAppSelector((state) => state.mediaItem.mediaSrc);

  const [title, setTitle] = useState(mediaItem?.title);
  const [description, setDescription] = useState(mediaItem?.description);
  const [category, setCategory] = useState();

  const mediaItems = useMediaItems();

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
    };

    await dispatch(updateMediaItem(dto));
    mediaItems();
  };

  useEffect(() => {
    if (mediaItem) {
      setTitle(mediaItem?.title);
      setDescription(mediaItem?.description);
      setCategory(mediaItem?.category as any);
    }
  }, [mediaItem]);
  if (!mediaItem) {
    return <Paragraph>Loading</Paragraph>;
  }
  return (
    <PageContainer>
      <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <FAB style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }} small icon="plus" onPress={() => console.log('Pressed')} />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <MediaCard
              title={title}
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
          </TouchableWithoutFeedback>
          <View>
            <ActionButtons actionCb={saveItem} cancelCb={cancelCb} rightIcon="check-circle" actionLabel={actionLabel} cancelLabel={cancelLabel} />
          </View>
        </KeyboardAvoidingView>
      </View>
    </PageContainer>
  );
};

export default withLoadingSpinner(MediaItemEdit);
