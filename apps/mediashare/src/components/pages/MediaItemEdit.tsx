import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withGlobalStateConsumer } from '../../core/globalState/index';

import { useAppSelector } from '../../store';
import { deleteMediaItem, updateMediaItem } from '../../store/modules/media-items';

import { MediaCategoryType, UpdateMediaItemDto } from '../../rxjs-api';
import { useMediaItems } from '../../hooks/NavigationHooks';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { Button, Paragraph } from 'react-native-paper';
import { View, ScrollView } from 'react-native';

import { ActionButtons } from '../layout/ActionButtons';
import { MediaCard } from '../layout/MediaCard';
import { PageContainer, KeyboardAvoidingPageContent, PageActions, PageProps } from '../layout/PageContainer';
import AppDialog from '../layout/AppDialog';

import styles, { theme } from '../../styles';
import AppUpload from '../layout/AppUpload';

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
  const options = [];
  for (const value in MediaCategoryType) {
    options.push(value);
  }

  const { tags = [] } = globalState;

  const dispatch = useDispatch();

  const { mediaId } = route?.params || {};
  const mediaItem = useAppSelector((state) => state?.mediaItem?.entity);

  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState(mediaItem?.title);
  const [description, setDescription] = useState(mediaItem?.description);
  const [category, setCategory] = useState();
  const mediaItemTags = getItemTags();
  const [selectedTagKeys, setSelectedTagKeys] = useState(mediaItemTags);
  const [documentUri] = useState(mediaItem?.uri);
  const [thumbnail, setThumbnail] = useState(mediaItem?.thumbnail);
  const mediaItems = useMediaItems();

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

  // @ts-ignore
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
        <ScrollView>
          <MediaCard
            key={mediaId}
            title={title}
            description={description}
            mediaSrc={documentUri}
            thumbnail={thumbnail}
            showThumbnail={true}
            category={category}
            categoryOptions={options}
            onCategoryChange={(e: any) => {
              setCategory(e);
            }}
            availableTags={tags}
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
                <View style={{ flex: 1 }}>
                  <Button
                    icon="delete-forever"
                    mode="text"
                    dark
                    color={theme.colors.error}
                    onPress={() => setShowDialog(true)}
                    compact
                    style={styles.deleteItemButton}
                  >
                    {' '}
                  </Button>
                </View>
                <View style={{ flex: 4 }}>
                  <AppUpload uploadMode="photo" onUpload={setThumbnail}>
                    <Button icon="cloud-upload" mode="outlined" dark color={theme.colors.default} compact style={styles.changeImageButton}>
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
        <ActionButtons onActionClicked={saveItem} onCancelClicked={cancelCb} actionLabel="Save" />
      </PageActions>
    </PageContainer>
  );

  function getItemTags() {
    return mediaItem?.tags?.map((tag) => (tag ? tag?.key : undefined)).filter((tag) => !!tag) || [];
  }

  function resetData() {}

  function cancelCb() {
    navigation.goBack();
    resetData();
  }

  async function saveItem() {
    // We only keep track of the tag key, we need to provide a { key, value } pair to to the API
    // Map keys using our tag keys in state... ideally at some point maybe we do this on the server
    const selectedTags = selectedTagKeys.map((key) => tags.find((tag) => tag.key === key)).map(({ key, value }) => ({ key, value }));
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
    mediaItems().then();
  }

  async function deleteItem() {
    await dispatch(deleteMediaItem({ id: mediaId, key: mediaItem.uri }));
    mediaItems().then();
  }
};

export default withLoadingSpinner(withGlobalStateConsumer(MediaItemEdit));
