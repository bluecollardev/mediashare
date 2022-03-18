import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

import { addMediaItem } from '../../store/modules/media-items';

import { CreateMediaItemDto, MediaCategoryType } from '../../rxjs-api';

import { useMediaItems } from '../../hooks/NavigationHooks';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { ActionButtons } from '../layout/ActionButtons';
import { MediaCard } from '../layout/MediaCard';
import { KeyboardAvoidingPageContent, PageActions, PageContainer, PageProps } from '../layout/PageContainer';
import { tagValidator, categoryValidator, descriptionValidator, titleValidator } from '../layout/formConfig';

import { minLength } from '../../core/lib/Validators';
import { theme } from '../../styles';
import { AppUpload } from '../layout/AppUpload';
import { UploadPlaceholder } from '../layout/UploadPlaceholder';

export const MediaItemAdd = ({}: PageProps) => {
  const dispatch = useDispatch();

  // const author = useAppSelector((state) => state?.user.username);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(MediaCategoryType.Free);
  const [tags, setTags] = useState([]);
  const [mediaUri, setMediaUri] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  // const mediaSrc = useAppSelector((state) => state.mediaItem.mediaSrc);
  const isValid = function () {
    return !titleValidator(title) && !descriptionValidator(description) && !categoryValidator(category) && !minLength(1)(mediaUri);
  };

  const options = [];
  for (const value in MediaCategoryType) {
    options.push(value);
  }

  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';
  const cancelCb = clearAndGoBack;
  const goToMediaItems = useMediaItems();

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
        <ScrollView>
          <MediaCard
            title={title}
            description={description}
            mediaSrc={mediaUri}
            showThumbnail={!!mediaUri}
            thumbnail={thumbnail}
            category={category}
            categoryOptions={options}
            onCategoryChange={(e: any) => {
              setCategory(e);
            }}
            tags={tags}
            tagOptions={options}
            onTagChange={(e: any) => {
              setTags(e);
            }}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            isEdit={true}
            isPlayable={true}
            topDrawer={() =>
              !mediaUri ? (
                <AppUpload uploadMode="video" onUpload={onUploadSuccess}>
                  <UploadPlaceholder buttonText="Upload Media" />
                </AppUpload>
              ) : (
                <AppUpload uploadMode="video" onUpload={onUploadSuccess}>
                  <Button icon="cloud-upload" mode="outlined" dark color={theme.colors.default} compact>
                    Replace Media
                  </Button>
                </AppUpload>
              )
            }
          />
        </ScrollView>
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

  async function onUploadSuccess(media) {
    setMediaUri(media.uri || '');
  }

  async function saveItem() {
    const dto: CreateMediaItemDto = {
      key: title,
      title,
      description,
      summary: '',
      thumbnail: thumbnail,
      isPlayable: true,
      uri: mediaUri,
      category: MediaCategoryType[category],
      tags: tags || ([] as any[]),
      eTag: '',
    };
    await dispatch(addMediaItem(dto));

    setCategory(MediaCategoryType.Free);
    setTags([]);
    setDescription('');
    setThumbnail('');
    goToMediaItems();
  }

  function clearAndGoBack() {
    setTitle('');
    setCategory(MediaCategoryType.Free);
    setTags([] as any[]);
    setDescription('');
    setThumbnail('');
    goToMediaItems();
  }
};

export default withLoadingSpinner(MediaItemAdd);
