import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Image } from 'react-native';
import { Button, CardItem, Icon, Text } from 'native-base';
import * as DocumentPicker from 'expo-document-picker';
import Config from 'react-native-config';

import { useAppSelector } from '../../state';
import { addMediaItem, createThumbnail } from '../../state/modules/media-items';
import { setError } from '../../state/modules/app-state/';

import { CreateMediaItemDto, CreateMediaItemDtoCategoryEnum } from '../../rxjs-api';

import { useMediaItems } from '../../hooks/NavigationHooks';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { ActionButtons } from '../layout/ActionButtons';
import { MediaCard } from '../layout/MediaCard';
import { PageContainer, KeyboardAvoidingPageContent, PageActions, PageProps } from '../layout/PageContainer';
import { categoryValidator, descriptionValidator, titleValidator } from '../layout/formConfig';

import { minLength } from '../../lib/Validators';
import { theme } from '../../styles';

const maxUpload = parseInt(Config.MAX_UPLOAD, 10) || 104857600;

export const AddMedia = ({ startLoad, endLoad }: PageProps) => {
  const dispatch = useDispatch();

  const author = useAppSelector((state) => state?.user.username);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CreateMediaItemDtoCategoryEnum.Endurance);
  const [documentUri, setDocumentUri] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const mediaSrc = useAppSelector((state) => state.mediaItem.mediaSrc);
  const isValid = function () {
    const test = !titleValidator(title) && !descriptionValidator(description) && !categoryValidator(category) && !minLength(1)(documentUri);
    return test;
  };

  const options = [];
  for (const value in CreateMediaItemDtoCategoryEnum) {
    options.push(value);
  }
  // const [{ AppSpinner, isLoading, endLoad, startLoad }] = useSpinner({ ...SPINNER_DEFAULTS, loadingState: false });

  const onTitleChange = setTitle;
  const onDescriptionChange = setDescription;
  const onCategoryChange = setCategory;

  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';
  const cancelCb = clearAndGoBack;
  const mediaItems = useMediaItems();

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
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
          <CardItem button onPress={getDocument} cardBody style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {documentUri ? (
              <Image source={{ uri: mediaSrc }} style={{ height: 200, width: '100%' }} />
            ) : (
              <Button
                color={theme.colors.accentDarker}
                bordered
                style={{ width: '100%', borderColor: theme.colors.accentDarker, borderWidth: 1 }}
                hasText={true}
                onPress={getDocument}
                full={true}
              >
                <Icon name="cloud-upload" style={{ color: theme.colors.accentDarker }} />
                <Text style={{ textAlign: 'center', color: theme.colors.accentDarker }}>Upload From Device</Text>
              </Button>
            )}
          </CardItem>
          {/* <CardItem button onPress={getDocument} cardBody style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
            {documentUri ? (
              <Image source={{ uri: mediaSrc }} style={{ height: 200, width: '100%' }} />
            ) : (
              <Button
                color={theme.colors.primary}
                bordered
                style={{ width: '100%', borderColor: theme.colors.primary, borderWidth: 1 }}
                hasText={true}
                onPress={getDocument}
                full={true}
              >
                <Icon name="image" style={{ color: theme.colors.primary }} />
                <Text style={{ textAlign: 'center', color: theme.colors.primary }}>Upload Preview Image</Text>
              </Button>
            )}
          </CardItem> */}
        </MediaCard>
      </KeyboardAvoidingPageContent>
      <PageActions>
        <ActionButtons
          actionCb={() => saveItem()}
          cancelCb={cancelCb}
          actionLabel={actionLabel}
          cancelLabel={cancelLabel}
          disableAction={!isValid()}
          rightIcon="check-circle"
        />
      </PageActions>
    </PageContainer>
  );

  async function getDocument() {
    startLoad();
    const document = (await DocumentPicker.getDocumentAsync({ type: 'video/mp4' })) as any;
    if (!document) {
      endLoad();
      return;
    }
    if (!document || document.size > maxUpload) {
      dispatch(setError({ name: 'File too big', message: `Files must be under ${maxUpload / 1024 / 1024} Mb` }));
      endLoad();
      return;
    }

    console.log('Document upload response');
    console.log(document);
    try {
      console.log('Dispatching createThumbnail action');
      await dispatch(createThumbnail({ key: document.name, fileUri: document.uri }));
    } catch (err) {
      console.log(err);
    }
    setDocumentUri(document.uri || '');
    endLoad();
  }

  async function saveItem() {
    startLoad();
    const dto: CreateMediaItemDto = {
      title,
      category: CreateMediaItemDtoCategoryEnum[category],
      description,
      summary: '',
      isPlayable: true,
      uri: documentUri,
      thumbnail: thumbnail,
      key: title,
      eTag: '',
    };
    await dispatch(addMediaItem(dto));

    setCategory(CreateMediaItemDtoCategoryEnum.Free);
    setDescription('');
    setThumbnail('');
    endLoad();
    mediaItems();
  }

  function clearAndGoBack() {
    setTitle('');
    setCategory(CreateMediaItemDtoCategoryEnum.Free);
    setDescription('');
    setThumbnail('');
    mediaItems();
  }
};

export default withLoadingSpinner(AddMedia);
