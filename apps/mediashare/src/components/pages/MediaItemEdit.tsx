import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { mapAvailableTags, mapSelectedTagKeysToTagKeyValue } from 'mediashare/store/modules/tags';
import { useAppSelector } from 'mediashare/store';
import { deleteMediaItem, updateMediaItem } from 'mediashare/store/modules/mediaItem';
// TODO: Fix update dto! Not sure why it's not being exported normally...
import { UpdateMediaItemDto } from 'mediashare/rxjs-api/models/UpdateMediaItemDto';
import { MediaCategoryType } from 'mediashare/rxjs-api';
import { useMediaItems } from 'mediashare/hooks/navigation';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { Button, Paragraph } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
import { PageContainer, KeyboardAvoidingPageContent, PageActions, PageProps } from 'mediashare/components/layout/PageContainer';
import { AppDialog } from 'mediashare/components/layout/AppDialog';
import { MediaCard } from 'mediashare/components/layout/MediaCard';
import { AppUpload } from 'mediashare/components/layout/AppUpload';
import { ActionButtons } from 'mediashare/components/layout/ActionButtons';
import styles, { theme } from 'mediashare/styles';

export interface MediaItemEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}

export interface MediaItemEditContainerState {}

const MediaItemEdit = ({
  navigation,
  route,
  // @ts-ignore
  globalState = {
    tags: [],
  },
}: PageProps) => {
  const dispatch = useDispatch();

  const options = [];
  for (const value in MediaCategoryType) {
    options.push(value);
  }

  const { mediaId } = route?.params || {};
  const mediaItem = useAppSelector((state) => state?.mediaItem?.entity);

  const [isSaved, setIsSaved] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState(mediaItem?.title);
  const [description, setDescription] = useState(mediaItem?.description);
  const [category, setCategory] = useState();

  const { tags = [] } = globalState;
  const availableTags = useMemo(() => mapAvailableTags(tags).filter((tag) => tag.isMediaTag), []);
  const initialMediaItemTags = getInitialMediaItemTags();
  const [selectedTagKeys, setSelectedTagKeys] = useState(initialMediaItemTags);

  const [documentUri] = useState(mediaItem?.uri);
  const [thumbnail, setThumbnail] = useState(mediaItem?.thumbnail);
  const viewMediaItems = useMediaItems();

  useEffect(() => {
    if (mediaItem) {
      const mediaItemTags = (mediaItem?.tags || []).map(({ key }) => key);
      setTitle(mediaItem?.title);
      setDescription(mediaItem?.description);
      setCategory(mediaItem?.category as any);
      setSelectedTagKeys(mediaItemTags as any[]);
    }
  }, [mediaItem]);
  if (!mediaItem) {
    return <Paragraph>Loading</Paragraph>;
  }

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
        <AppDialog
          leftActionLabel="Cancel"
          rightActionLabel="Delete"
          leftActionCb={() => setShowDialog(false)}
          rightActionCb={() => deleteItem()}
          onDismiss={() => setShowDialog(false)}
          showDialog={showDialog}
          title="Delete Media Item"
          subtitle="Are you sure you want to do this? This action is final and cannot be undone."
          color={theme.colors.white}
          buttonColor={theme.colors.error}
        />
        <ScrollView>
          <MediaCard
            key={mediaId}
            title={title}
            description={description}
            mediaSrc={documentUri}
            showThumbnail={true}
            thumbnail={thumbnail}
            thumbnailStyle={{
              // TODO: Can we do this automatically from video metadata?
              aspectRatio: 1 / 1,
            }}
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
            topDrawer={() => (
              <View style={styles.itemControls}>
                <View style={{ flex: 0, width: 54 }}>
                  <Button
                    icon="delete-forever"
                    mode="text"
                    dark
                    compact
                    color={theme.colors.white}
                    style={styles.deleteItemButton}
                    onPress={() => setShowDialog(true)}
                  >
                    {' '}
                  </Button>
                </View>
                <View style={{ flex: 4 }}>
                  <AppUpload uploadMode="photo" onUploadComplete={setThumbnail}>
                    <Button
                      icon="cloud-upload"
                      mode="outlined"
                      dark
                      color={theme.colors.default}
                      compact
                      uppercase={false}
                      style={styles.changeImageButton}
                      labelStyle={styles.changeImageButtonLabel}
                    >
                      Change Preview Image
                    </Button>
                  </AppUpload>
                </View>
              </View>
            )}
          />
        </ScrollView>
      </KeyboardAvoidingPageContent>
      <PageActions>
        <ActionButtons loading={isSaved} onPrimaryClicked={saveItem} onSecondaryClicked={clearAndGoBack} primaryLabel="Save" />
      </PageActions>
    </PageContainer>
  );

  function getInitialMediaItemTags() {
    return (
      mediaItem?.tags
        ?.map((tag) => {
          return tag ? tag?.key : undefined;
        })
        .filter((tag) => !!tag) || []
    );
  }

  async function saveItem() {
    setIsSaved(true);

    // We only keep track of the tag key, we need to provide a { key, value } pair to to the API
    // Map keys using our tag keys in state... ideally at some point maybe we do this on the server
    const selectedTags = mapSelectedTagKeysToTagKeyValue(selectedTagKeys, availableTags);

    const dto: UpdateMediaItemDto & { _id } = {
      _id: mediaId,
      title,
      description,
      thumbnail,
      isPlayable: true,
      category: MediaCategoryType[category as any],
      tags: selectedTags || [],
    };

    await dispatch(updateMediaItem(dto));
    setIsSaved(false);
    await viewMediaItems();
  }

  async function deleteItem() {
    await dispatch(deleteMediaItem({ id: mediaId, key: mediaItem.uri }));
    await viewMediaItems();
  }

  function resetData() {}

  function clearAndGoBack() {
    navigation.goBack();
    resetData();
  }
};

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(MediaItemEdit));
