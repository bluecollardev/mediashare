import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { useAppSelector } from 'mediashare/store';
import { getPlaylistById, updateUserPlaylist } from 'mediashare/store/modules/playlists';
import { mapAvailableTags } from 'mediashare/store/modules/tags';
import { usePlaylists, useRouteWithParams, useViewMediaItem } from 'mediashare/hooks/NavigationHooks';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { PageContainer, KeyboardAvoidingPageContent, PageActions, PageProps, ActionButtons, AppUpload, MediaList, MediaCard, UploadPlaceholder } from 'mediashare/components/layout';
import { routeNames } from 'mediashare/routes';
import { createRandomRenderKey } from 'mediashare/core/utils';
import { PlaylistCategoryType, MediaItem, MediaCategoryType } from 'mediashare/rxjs-api';
import styles, { theme } from 'mediashare/styles';

const actionModes = { delete: 'delete', default: 'default' };

// @ts-ignore
const PlaylistEdit = ({ navigation, route, globalState = { tags: [] } }: PageProps) => {
  const dispatch = useDispatch();

  const { tags = [] } = globalState;
  const mappedTags = useMemo(() => mapAvailableTags(tags).filter((tag) => tag.isPlaylistTag), []);

  const addToPlaylist = useRouteWithParams(routeNames.addItemsToPlaylist);
  const viewMediaItem = useViewMediaItem();
  const goToPlaylists = usePlaylists();

  const { playlistId } = route.params;

  const { loaded, selected } = useAppSelector((state) => state?.playlist);

  const [isLoaded, setIsLoaded] = useState(loaded);
  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);

  const [title, setTitle] = useState(selected?.title);
  const [description, setDescription] = useState(selected?.description);
  const [category, setCategory] = useState(selected?.category);
  const playlistTags = getPlaylistTags();
  const [selectedTagKeys, setSelectedTagKeys] = useState(playlistTags);
  const [selectedItems, setSelectedItems] = useState([]);
  // @ts-ignore
  const [imageSrc, setImageSrc] = useState(selected?.imageSrc);

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

  const onUploadComplete = (uri: string) => {
    setImageSrc(uri);
  };

  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  // @ts-ignore
  const items = selected?.mediaItems || [];
  const author = '';

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
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
            availableTags={mappedTags}
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
                      onPress={() => console.log('Do something!')}
                    >
                      {' '}
                    </Button>
                  </View>
                  <View style={{ flex: 4 }}>
                    <AppUpload uploadMode="photo" onUploadComplete={onUploadComplete}>
                      <Button mode="outlined" dark color={theme.colors.default} compact uppercase={false} style={styles.changeImageButton}>
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
        {!isSelectable && <ActionButtons onActionClicked={() => savePlaylist()} onCancelClicked={cancelCb} actionLabel="Save" />}
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

  function getPlaylistTags() {
    return selected?.tags?.map((tag) => (tag ? tag?.key : undefined)).filter((tag) => !!tag) || [];
  }

  async function saveWithIds(mediaIds: string[]) {
    // We only keep track of the tag key, we need to provide a { key, value } pair to to the API
    // Map keys using our tag keys in state... ideally at some point maybe we do this on the server
    const selectedTags = selectedTagKeys.map((key) => tags.find((tag) => tag.key === key)).map(({ key, value }) => ({ key, value }));
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

  async function loadData() {
    await dispatch(getPlaylistById(playlistId));
    setIsLoaded(true);
  }

  function clearCheckboxSelection() {
    const randomKey = createRandomRenderKey();
    setClearSelectionKey(randomKey);
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

  async function activateDeleteMode() {
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

  async function cancelDeletePlaylistItems() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
    resetData();
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

  function resetData() {
    setSelectedItems([]);
  }

  function cancelCb() {
    navigation.goBack();
    resetData();
  }
};

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(PlaylistEdit));
