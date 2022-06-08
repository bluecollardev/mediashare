import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { useAppSelector } from 'mediashare/store';
import { getPlaylistById, removeUserPlaylist, updateUserPlaylist } from 'mediashare/store/modules/playlist';
import { getUserPlaylists } from 'mediashare/store/modules/playlists';
import { mapAvailableTags, mapSelectedTagKeysToTagKeyValue } from 'mediashare/store/modules/tags';
import { usePlaylists, useRouteWithParams, useViewMediaItemById } from 'mediashare/hooks/navigation';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import {
  PageContainer,
  KeyboardAvoidingPageContent,
  PageActions,
  PageProps,
  ActionButtons,
  AppUpload,
  MediaList,
  MediaCard,
  UploadPlaceholder,
  AppDialog,
} from 'mediashare/components/layout';
import { routeNames } from 'mediashare/routes';
import { createRandomRenderKey } from 'mediashare/core/utils/uuid';
import { PlaylistCategoryType, MediaItem, MediaCategoryType } from 'mediashare/rxjs-api';
import styles, { theme } from 'mediashare/styles';

const actionModes = { delete: 'delete', default: 'default' };

// @ts-ignore
const PlaylistEdit = ({ navigation, route, globalState = { tags: [] } }: PageProps) => {
  const dispatch = useDispatch();

  const addToPlaylist = useRouteWithParams(routeNames.addItemsToPlaylist);
  const viewMediaItem = useViewMediaItemById();
  const goToPlaylists = usePlaylists();

  const { playlistId } = route.params;

  const { loaded, selected } = useAppSelector((state) => state?.playlist);
  const [isLoaded, setIsLoaded] = useState(loaded);

  const [title, setTitle] = useState(selected?.title);
  const [description, setDescription] = useState(selected?.description);
  const [category, setCategory] = useState(selected?.category);
  const [imageSrc, setImageSrc] = useState(selected?.imageSrc);

  const { tags = [] } = globalState;
  const availableTags = useMemo(() => mapAvailableTags(tags).filter((tag) => tag.isPlaylistTag), []);
  const initialPlaylistTags = getInitialPlaylistTags();
  const [selectedTagKeys, setSelectedTagKeys] = useState(initialPlaylistTags);

  const [actionMode, setActionMode] = useState(actionModes.default);
  const [isSelectable, setIsSelectable] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      loadData().then();
    }
  }, [isLoaded]);

  const options = [];
  for (const value in PlaylistCategoryType) {
    options.push(value);
  }

  const [clearSelectionKey, setClearSelectionKey] = useState(createRandomRenderKey());

  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  // @ts-ignore
  const items = selected?.mediaItems || [];
  const author = '';

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
        <AppDialog
          leftActionLabel="Cancel"
          rightActionLabel="Delete"
          leftActionCb={() => setShowDeleteDialog(false)}
          rightActionCb={() => deletePlaylist()}
          onDismiss={() => setShowDeleteDialog(false)}
          showDialog={showDeleteDialog}
          title="Delete Playlist"
          subtitle="Are you sure you want to do this? This action is final and cannot be undone."
        />
        <ScrollView>
          <MediaCard
            title={title}
            author={author}
            description={description}
            showThumbnail={true}
            thumbnail={imageSrc}
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
            isReadOnly={selectedItems && selectedItems.length > 0}
            topDrawer={() =>
              imageSrc ? (
                <View style={styles.itemControls}>
                  <View style={{ flex: 0, width: 54 }}>
                    <Button
                      icon="delete-forever"
                      mode="outlined"
                      dark
                      compact
                      color={theme.colors.white}
                      style={styles.deleteItemButton}
                      onPress={() => setShowDeleteDialog(true)}
                    >
                      {' '}
                    </Button>
                  </View>
                  <View style={{ flex: 4 }}>
                    <AppUpload uploadMode="photo" onUploadComplete={onUploadComplete}>
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
                        <Text>Change Cover Photo</Text>
                      </Button>
                    </AppUpload>
                  </View>
                </View>
              ) : (
                <View style={styles.itemControls}>
                  <View style={{ flex: 1 }}>
                    <AppUpload uploadMode="photo" onUploadComplete={onUploadComplete}>
                      <UploadPlaceholder buttonText="Add Cover Photo" />
                    </AppUpload>
                  </View>
                </View>
              )
            }
          >
            <ActionButtons
              containerStyles={{ marginHorizontal: 0, marginBottom: 15 }}
              showCancel={Array.isArray(items) && items.length > 0}
              cancelIcon="rule"
              onCancelClicked={() => (!isSelectable ? activateDeleteMode() : cancelDeletePlaylistItems())}
              cancelIconColor={isSelectable ? theme.colors.primary : theme.colors.disabled}
              disableAction={actionMode === actionModes.delete}
              actionLabel="Add To Playlist"
              actionIcon={!(Array.isArray(items) && items.length > 0) ? 'playlist-add' : undefined}
              onActionClicked={() => addToPlaylist({ playlistId })}
            />
            <MediaList
              key={clearSelectionKey}
              onViewDetail={(item) => viewMediaItem({ mediaId: item._id, uri: item.uri })}
              list={items}
              selectable={isSelectable}
              showActions={!isSelectable}
              removeItem={onRemoveItem}
              addItem={onAddItem}
              showThumbnail={true}
            />
          </MediaCard>
        </ScrollView>
      </KeyboardAvoidingPageContent>
      <PageActions>
        {!isSelectable && <ActionButtons onActionClicked={savePlaylist} onCancelClicked={clearAndGoBack} actionLabel="Save" />}
        {isSelectable && (
          <ActionButtons
            onActionClicked={confirmDeletePlaylistItems}
            onCancelClicked={cancelDeletePlaylistItems}
            actionLabel="Remove"
            actionIconColor={theme.colors.error}
          />
        )}
      </PageActions>
    </PageContainer>
  );

  function getInitialPlaylistTags() {
    return (
      selected?.tags
        ?.map((tag) => {
          return tag ? tag?.key : undefined;
        })
        .filter((tag) => !!tag) || []
    );
  }

  async function loadData() {
    await dispatch(getPlaylistById(playlistId));
    setIsLoaded(true);
  }

  function onUploadComplete(uri: string) {
    setImageSrc(uri);
  }

  async function savePlaylist() {
    // @ts-ignore
    const mediaIds = selected.mediaItems.map((item) => item._id) || [];
    if (isSelectable) {
      const filtered = mediaIds.filter((id) => !selectedItems.includes(id));
      await saveWithIds(filtered);
    } else {
      await saveWithIds(mediaIds);
    }

    setIsLoaded(false);
    // await loadData();
    goToPlaylists();
  }

  async function savePlaylistItems() {
    // @ts-ignore
    const mediaIds = selected.mediaItems.map((item) => item._id) || [];
    if (isSelectable) {
      const filtered = mediaIds.filter((id) => !selectedItems.includes(id));
      await saveWithIds(filtered);
    } else {
      await saveWithIds(mediaIds);
    }

    setIsLoaded(false);
    // await loadData();
  }

  async function saveWithIds(mediaIds: string[]) {
    // We only keep track of the tag key, we need to provide a { key, value } pair to to the API
    // Map keys using our tag keys in state... ideally at some point maybe we do this on the server
    const selectedTags = mapSelectedTagKeysToTagKeyValue(selectedTagKeys, availableTags);

    await dispatch(
      updateUserPlaylist({
        _id: selected._id,
        title,
        description,
        mediaIds,
        category: MediaCategoryType[category as any],
        tags: (selectedTags || []) as any[],
        imageSrc,
      })
    );
  }

  // const [selected, setSelected] = useState(selectedItems.size);
  function onAddItem(item: MediaItem) {
    // setSelected(selectedItems.size);
    const updatedItems = selectedItems.concat([item._id]);
    setSelectedItems(updatedItems);
  }

  function onRemoveItem(selected: MediaItem) {
    const updatedItems = selectedItems.filter((item) => item !== selected._id);
    setSelectedItems(updatedItems);
  }

  function clearCheckboxSelection() {
    const randomKey = createRandomRenderKey();
    setClearSelectionKey(randomKey);
  }

  function activateDeleteMode() {
    setActionMode(actionModes.delete);
    setIsSelectable(true);
  }

  async function confirmDeletePlaylistItems() {
    await savePlaylistItems();
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
    resetData();
  }

  function cancelDeletePlaylistItems() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
    resetData();
  }

  async function deletePlaylist() {
    await dispatch(removeUserPlaylist(playlistId));
    await dispatch(getUserPlaylists());
    await goToPlaylists();
  }

  function resetData() {
    setSelectedItems([]);
  }

  function clearAndGoBack() {
    navigation.goBack();
    resetData();
  }
};

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(PlaylistEdit));
