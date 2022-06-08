import { getPlaylistById } from 'mediashare/store/modules/playlist';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { mapAvailableTags, mapSelectedTagKeysToTagKeyValue } from 'mediashare/store/modules/tags';
import { useAppSelector } from 'mediashare/store';
import { deletePlaylistItem, updatePlaylistItem } from 'mediashare/store/modules/playlistItem';
// TODO: Fix update dto! Not sure why it's not being exported normally...
import { UpdatePlaylistItemDto } from 'mediashare/rxjs-api/models/UpdatePlaylistItemDto';
import { MediaCategoryType } from 'mediashare/rxjs-api';
// TODO: We don't have playlist items, per se... just media items for now, revisit this and confirm
// import { usePlaylistItems } from 'mediashare/hooks/navigation';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { Button, Paragraph } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
import { PageContainer, KeyboardAvoidingPageContent, PageActions, PageProps } from 'mediashare/components/layout/PageContainer';
import { AppDialog } from 'mediashare/components/layout/AppDialog';
import { MediaCard } from 'mediashare/components/layout/MediaCard';
import { AppUpload } from 'mediashare/components/layout/AppUpload';
import { ActionButtons } from 'mediashare/components/layout/ActionButtons';
import styles, { theme } from 'mediashare/styles';

export interface PlaylistItemEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}

export interface PlaylistItemEditContainerState {}

const PlaylistItemEdit = ({
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

  const { playlistItemId } = route?.params || {};
  const playlistItem = useAppSelector((state) => state?.playlistItem?.entity);

  const [showDialog, setShowDialog] = useState(false);

  const [title, setTitle] = useState(playlistItem?.title);
  const [description, setDescription] = useState(playlistItem?.description);
  const [category, setCategory] = useState(playlistItem?.category);
  const [sortIndex, setSortIndex] = useState(String(playlistItem?.sortIndex));

  const { tags = [] } = globalState;
  const availableTags = useMemo(() => mapAvailableTags(tags).filter((tag) => tag.isMediaTag), []);
  const initialPlaylistItemTags = getInitialPlaylistItemTags();
  const [selectedTagKeys, setSelectedTagKeys] = useState(initialPlaylistItemTags);

  const [documentUri] = useState(playlistItem?.uri);
  const [thumbnail, setThumbnail] = useState(playlistItem?.thumbnail);
  // TODO: Fix this! We don't really have a list of playlist items do we?
  // const playlistItems = []; // usePlaylistItems();

  useEffect(() => {
    if (playlistItem) {
      const playlistItemTags = (playlistItem?.tags || []).map(({ key }) => key);
      setTitle(playlistItem?.title);
      setDescription(playlistItem?.description);
      setCategory(playlistItem?.category as any);
      setSelectedTagKeys(playlistItemTags as any[]);
    }
  }, [playlistItem]);
  if (!playlistItem) {
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
        />
        <ScrollView>
          <MediaCard
            key={playlistItemId}
            title={title}
            description={description}
            sortIndex={String(sortIndex)}
            mediaSrc={documentUri}
            thumbnail={thumbnail}
            showThumbnail={true}
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
            onSortIndexChange={setSortIndex}
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
        <ActionButtons onActionClicked={saveItem} onCancelClicked={clearAndGoBack} actionLabel="Save" />
      </PageActions>
    </PageContainer>
  );

  function getInitialPlaylistItemTags() {
    return (
      playlistItem?.tags
        ?.map((tag) => {
          return tag ? tag?.key : undefined;
        })
        .filter((tag) => !!tag) || []
    );
  }

  async function saveItem() {
    // We only keep track of the tag key, we need to provide a { key, value } pair to to the API
    // Map keys using our tag keys in state... ideally at some point maybe we do this on the server
    const selectedTags = mapSelectedTagKeysToTagKeyValue(selectedTagKeys, availableTags);

    const dto: UpdatePlaylistItemDto & { _id } = {
      _id: playlistItemId,
      title,
      description,
      thumbnail,
      isPlayable: true,
      category: MediaCategoryType[category as any],
      tags: selectedTags || [],
    };

    await dispatch(updatePlaylistItem(dto));
    // TODO: Fix this!
    // playlistItems().then();
  }

  async function deleteItem() {
    await dispatch(deletePlaylistItem({ id: playlistItemId, key: playlistItem.uri }));
    // TODO: Fix this!
    // playlistItems().then();
  }

  function resetData() {}

  function clearAndGoBack() {
    navigation.goBack();
    resetData();
  }
};

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(PlaylistItemEdit));
