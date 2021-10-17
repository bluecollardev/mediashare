import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Config from 'react-native-config';
import { Button } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';

import { addMediaItem, createThumbnail } from '../../state/modules/media-items';
import { setError } from '../../state/modules/app-state/';

import { CreateMediaItemDto, MediaCategoryType } from '../../rxjs-api';

import { useMediaItems } from '../../hooks/NavigationHooks';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { ActionButtons } from '../layout/ActionButtons';
import { MediaCard } from '../layout/MediaCard';
import { KeyboardAvoidingPageContent, PageActions, PageContainer, PageProps } from '../layout/PageContainer';
import { categoryValidator, descriptionValidator, titleValidator } from '../layout/formConfig';

import { minLength } from '../../core/lib/Validators';
import { theme } from '../../styles';
import { AppUpload } from '../layout/AppUpload';
import { UploadPlaceholder } from '../layout/UploadPlaceholder';

const maxUpload = parseInt(Config.MAX_UPLOAD, 10) || 104857600;

export const AddMedia = ({}: PageProps) => {
  const dispatch = useDispatch();

  // const author = useAppSelector((state) => state?.user.username);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(MediaCategoryType.Free);
  const [documentUri, setDocumentUri] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  // const mediaSrc = useAppSelector((state) => state.mediaItem.mediaSrc);
  const isValid = function () {
    return !titleValidator(title) && !descriptionValidator(description) && !categoryValidator(category) && !minLength(1)(documentUri);
  };

  const options = [];
  for (const value in MediaCategoryType) {
    options.push(value);
  }

  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';
  const cancelCb = clearAndGoBack;
  const mediaItems = useMediaItems();

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
        <MediaCard
          title={title}
          description={description}
          mediaSrc={documentUri}
          showThumbnail={!!documentUri}
          thumbnail={thumbnail}
          category={category}
          categoryOptions={options}
          onCategoryChange={(e: any) => {
            setCategory(e);
          }}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          isEdit={true}
          isPlayable={true}
          topDrawer={() =>
            !documentUri ? (
              <AppUpload onUpload={getDocument}>
                <UploadPlaceholder buttonText="Upload Media" />
              </AppUpload>
            ) : (
              <AppUpload onUpload={getDocument}>
                <Button icon="cloud-upload" mode="outlined" dark color={theme.colors.primary} compact>
                  Replace Media
                </Button>
              </AppUpload>
            )
          }
        />
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
    const document = (await DocumentPicker.getDocumentAsync({ type: 'video/mp4' })) as any;
    if (!document) {
      return;
    }
    if (!document || document.size > maxUpload) {
      dispatch(setError({ name: 'File too big', message: `Files must be under ${maxUpload / 1024 / 1024} Mb` }));
      return;
    }
    try {
      await dispatch(createThumbnail({ key: document.name, fileUri: document.uri }));
    } catch (err) {
      console.log(err);
    }
    setDocumentUri(document.uri || '');
  }

  async function saveItem() {
    const dto: CreateMediaItemDto = {
      title,
      category: MediaCategoryType[category],
      description,
      summary: '',
      isPlayable: true,
      uri: documentUri,
      thumbnail: thumbnail,
      key: title,
      eTag: '',
    };
    await dispatch(addMediaItem(dto));

    setCategory(MediaCategoryType.Free);
    setDescription('');
    setThumbnail('');
    mediaItems();
  }

  function clearAndGoBack() {
    setTitle('');
    setCategory(MediaCategoryType.Free);
    setDescription('');
    setThumbnail('');
    mediaItems();
  }
};

export default withLoadingSpinner(AddMedia);
