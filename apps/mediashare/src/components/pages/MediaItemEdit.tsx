import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { createThumbnail, deleteMediaItem, updateMediaItem } from '../../state/modules/media-items';

import { CreateMediaItemDtoCategoryEnum, CreatePlaylistDtoCategoryEnum, UpdateMediaItemDto } from '../../rxjs-api';
import { useMediaItems } from '../../hooks/NavigationHooks';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { Button, Paragraph } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';

import { ActionButtons } from '../layout/ActionButtons';
import { MediaCard } from '../layout/MediaCard';
import { PageContainer, KeyboardAvoidingPageContent, PageActions, PageProps } from '../layout/PageContainer';
import AppDialog from '../layout/AppDialog';

import { theme } from '../../styles';

export interface MediaItemEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}

export interface MediaItemEditContainerState {}

const MediaItemEdit = ({ navigation, route, startLoad, endLoad }: PageProps) => {
  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';
  const options = [];
  for (const value in CreateMediaItemDtoCategoryEnum) {
    options.push(value);
  }

  const dispatch = useDispatch();

  const { mediaId } = route?.params || {};

  const mediaItem = useAppSelector((state) => state.mediaItem.mediaItem);
  const mediaItemSrc = useAppSelector((state) => state.mediaItem.mediaSrc);
  const mediaSrc =
    useAppSelector((state) => state.mediaItem.getMediaItem) ||
    'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.us-west-2.amazonaws.com/public/temp/background-comp.jpg';

  const [title, setTitle] = useState(mediaItem?.title);
  const [description, setDescription] = useState(mediaItem?.description);
  const [category, setCategory] = useState();
  const [showDialog, setShowDialog] = useState(false);

  const [documentUri, setDocumentUri] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

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
      <KeyboardAvoidingPageContent>
        <AppDialog
          leftActionLabel={'Cancel'}
          rightActionLabel={'Delete'}
          leftActionCb={() => setShowDialog(false)}
          rightActionCb={() => deleteItem()}
          onDismiss={() => setShowDialog(false)}
          showDialog={showDialog}
          title={'Delete Media Item'}
          subtitle={'Are you sure you want to do this? This action is final and cannot be undone.'}
        />
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
        >
          <Button
            icon="cloud-upload"
            color={theme.colors.primary}
            dark
            mode={'contained'}
            style={{ width: '100%', marginTop: 5, marginBottom: 10 }}
            onPress={getDocument}
            compact
          >
            Upload Media
          </Button>
          {documentUri ? (
            {
              /*<Image source={{ uri: mediaSrc }} style={{ height: 200, width: '100%' }} />*/
            }
          ) : (
            <Button icon="add-a-photo" color={theme.colors.primary} mode={'outlined'} style={{ width: '100%', marginBottom: 10 }} onPress={getDocument} compact>
              Set Preview Image
            </Button>
          )}
          <Button
            icon="delete"
            mode="outlined"
            dark
            color={theme.colors.error}
            style={{ width: '100%', marginBottom: 10 }}
            onPress={() => setShowDialog(true)}
            compact
          >
            Delete Media Item
          </Button>
        </MediaCard>
      </KeyboardAvoidingPageContent>
      <PageActions>
        <ActionButtons actionCb={saveItem} cancelCb={cancelCb} rightIcon="check-circle" actionLabel={actionLabel} cancelLabel={cancelLabel} />
      </PageActions>
    </PageContainer>
  );

  async function deleteItem() {
    console.log('deleting');
    await dispatch(deleteMediaItem({ id: mediaId, key: mediaItem.uri }));
    mediaItems();
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

export default withLoadingSpinner(MediaItemEdit);
