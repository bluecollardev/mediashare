import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { addMediaItem } from 'mediashare/store/modules/mediaItem';
import { CreateMediaItemDto, MediaCategoryType } from 'mediashare/rxjs-api';
import { useMediaItems } from 'mediashare/hooks/navigation';
import { mapAvailableTags, mapSelectedTagKeysToTagKeyValue } from 'mediashare/store/modules/tags';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import {
  KeyboardAvoidingPageContent,
  PageActions,
  PageContainer,
  PageProps,
  ActionButtons,
  MediaCard,
  AppUpload,
  UploadPlaceholder,
} from 'mediashare/components/layout';
import { minLength, titleValidator, descriptionValidator, categoryValidator, tagValidator } from 'mediashare/core/utils/validators';
import { theme } from 'mediashare/styles';

// @ts-ignore
export const MediaItemAdd = ({ globalState = { tags: [] } }: PageProps) => {
  const dispatch = useDispatch();

  // const author = useAppSelector((state) => state?.user?.entity?.username);
  const [title, setTitle] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(MediaCategoryType.Free);

  const { tags = [] } = globalState;
  const availableTags = useMemo(() => mapAvailableTags(tags).filter((tag) => tag.isMediaTag), []);
  const initialTagKeys = [];
  const [selectedTagKeys, setSelectedTagKeys] = useState(initialTagKeys);

  const [mediaUri, setMediaUri] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [uploading, setUploading] = useState(false);
  // const mediaSrc = useAppSelector((state) => state?.mediaItem?.mediaSrc);
  const isValid = function () {
    return !titleValidator(title) && !descriptionValidator(description) && !categoryValidator(category) && !minLength(1)(mediaUri);
  };

  const options = [];
  for (const value in MediaCategoryType) {
    options.push(value);
  }

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
            availableTags={availableTags}
            tags={selectedTagKeys}
            tagOptions={options}
            onTagChange={(e: any) => {
              setSelectedTagKeys(e);
            }}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            isEdit={true}
            isPlayable={true}
            topDrawer={() =>
              !mediaUri ? (
                <AppUpload uploadMode="video" onUploadStart={onUploadStart} onUploadComplete={onUploadComplete}>
                  <UploadPlaceholder uploading={uploading} uploaded={!!mediaUri} buttonText="Upload Media" />
                </AppUpload>
              ) : (
                <AppUpload uploadMode="video" onUploadStart={onUploadStart} onUploadComplete={onUploadComplete}>
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
        <ActionButtons onPrimaryClicked={saveItem} loading={isSaved} onSecondaryClicked={clearAndGoBack} primaryLabel="Save" disablePrimary={!isValid()} />
      </PageActions>
    </PageContainer>
  );

  async function onUploadStart() {
    setUploading(true);
    setMediaUri('');
  }

  async function onUploadComplete(media) {
    setUploading(false);
    setMediaUri(media.uri || '');
  }

  async function saveItem() {
    setIsSaved(true);
    // We only keep track of the tag key, we need to provide a { key, value } pair to to the API
    // Map keys using our tag keys in state... ideally at some point maybe we do this on the server
    const selectedTags = mapSelectedTagKeysToTagKeyValue(selectedTagKeys, availableTags);

    const dto: CreateMediaItemDto = {
      key: title,
      title,
      description,
      summary: '',
      thumbnail: thumbnail,
      isPlayable: true,
      uri: mediaUri,
      category: MediaCategoryType[category],
      tags: selectedTags || [],
      eTag: '',
    };

    await dispatch(addMediaItem(dto));

    setCategory(MediaCategoryType.Free);
    setSelectedTagKeys([]);
    setDescription('');
    setThumbnail('');
    setIsSaved(false);
    goToMediaItems();
  }

  function resetData() {
    setTitle('');
    setCategory(MediaCategoryType.Free);
    setSelectedTagKeys([] as any[]);
    setDescription('');
    setThumbnail('');
  }

  function clearAndGoBack() {
    goToMediaItems().then();
    resetData();
  }
};

export default withLoadingSpinner((state) => {
  return !!state?.mediaItem?.loading || false;
})(withGlobalStateConsumer(MediaItemAdd));
