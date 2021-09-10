import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Image } from 'react-native';
import { Button, CardItem, Container, Icon, Text, View } from 'native-base';
import * as DocumentPicker from 'expo-document-picker';

import { ROUTES } from '../../../routes';

import { useGoBack, useRouteWithParams } from '../../../hooks/NavigationHooks';

import { useAppSelector } from '../../../state';
import { addMediaItem, createThumbnail } from '../../../state/modules/media-items';

import { ActionButtons } from '../../layout/ActionButtons';
import { MediaCard } from '../../layout/MediaCard';

import { CreateMediaItemDtoCategoryEnum, CreateMediaItemDto } from '../../../rxjs-api';
import { CreatePlaylistDtoCategoryEnum } from '../../../rxjs-api';

import styles from '../../../styles';

export const AddMediaContainer = () => {
  const dispatch = useDispatch();
  const author = useAppSelector((state) => state?.user.username);
  const [title, setTitle] = useState('Title');
  const [description, setDescription] = useState('Description');
  const [category, setCategory] = useState(CreateMediaItemDtoCategoryEnum.Endurance);
  const [documentUri, setDocumentUri] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const mediaSrc =
    useAppSelector((state) => state.mediaItem.getMediaItem) ||
    'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.us-west-2.amazonaws.com/public/temp/background-comp.jpg';
  const goBack = useGoBack();

  const clearAndGoBack = () => {
    setTitle('Title');
    setCategory(CreateMediaItemDtoCategoryEnum.Endurance);
    setDescription('Description');
    setThumbnail('');
    goBack();
  };
  const options = [];
  for (const value in CreatePlaylistDtoCategoryEnum) {
    options.push(value);
  }

  const goToItem = useRouteWithParams(ROUTES.libraryItemDetail);
  const onTitleChange = setTitle;
  const onDescriptionChange = setDescription;
  const onCategoryChange = setCategory;

  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';
  const cancelCb = clearAndGoBack;

  async function getDocument() {
    const document = (await DocumentPicker.getDocumentAsync({ type: 'video/mp4' })) as any;
    if (!document) {
      return;
    }
    setDocumentUri(document?.uri || '');
    dispatch(createThumbnail({ key: document.name, fileUri: document.uri }));
  }
  const saveItem = async function () {
    const dto: CreateMediaItemDto = {
      title,
      category: CreatePlaylistDtoCategoryEnum[category],
      description,
      summary: '',
      isPlayable: true,
      uri: documentUri,
      thumbnail: thumbnail,
      key: title,
      eTag: '',
    };
    const res = await dispatch(addMediaItem(dto));
    const item = res as any;

    setCategory(CreateMediaItemDtoCategoryEnum.Endurance);
    setDescription('Description');
    setThumbnail('');
    goToItem({ mediaId: item.payload._id, uri: item.payload.uri });
  };

  return (
    <Container style={styles.container}>
      <View padder>
        <MediaCard
          title={title}
          author={author}
          description={description}
          category={category}
          categoryOptions={options}
          onCategoryChange={onCategoryChange as any}
          onTitleChange={onTitleChange}
          onDescriptionChange={onDescriptionChange}
          isEdit={true}
        >
          <CardItem button onPress={getDocument} cardBody>
            {documentUri ? (
              <Image source={{ uri: mediaSrc }} style={{ width: '100%', height: 300 }} />
            ) : (
              <Button bordered style={{ width: '100%', height: 300 }} hasText={true} onPress={getDocument} full={true}>
                <Icon name="cloud-upload-outline" />
                <Text style={{ textAlign: 'center' }}>Upload</Text>
              </Button>
            )}
          </CardItem>
        </MediaCard>

        <ActionButtons actionCb={() => saveItem()} cancelCb={cancelCb} actionLabel={actionLabel} cancelLabel={cancelLabel} />
      </View>
    </Container>
  );
};

export default AddMediaContainer;
