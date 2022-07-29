import { createRandomRenderKey } from 'mediashare/core/utils/uuid';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { routeNames } from 'mediashare/routes';
import { useAppSelector } from 'mediashare/store';
import {
  getPlaylistById,
  removeUserPlaylist,
  selectMappedPlaylistMediaItems,
  updateUserPlaylist
} from 'mediashare/store/modules/playlist';
import { addPlaylistItem } from 'mediashare/store/modules/playlistItem';
import { getUserPlaylists, selectPlaylist } from 'mediashare/store/modules/playlists';
import { loadUsers } from 'mediashare/store/modules/users';
import { mapAvailableTags, mapSelectedTagKeysToTagKeyValue } from 'mediashare/store/modules/tags';
import {
  useRouteName,
  useRouteWithParams,
  useViewPlaylistItemById,
  useEditPlaylistItemById,
  usePlaylists,
  useViewMediaItemById,
} from 'mediashare/hooks/navigation';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { FAB } from 'react-native-paper';
import {
  PageContainer,
  PageContent,
  PageProps,
  ActionButtons,
  AppDialog,
  MediaCard,
  MediaList,
  PageActions
} from 'mediashare/components/layout';
import { AuthorProfileDto, MediaCategoryType, PlaylistItem, PlaylistResponseDto } from 'mediashare/rxjs-api';
import { theme } from 'mediashare/styles';

const actionModes = { delete: 'delete', default: 'default' };

// @ts-ignore
export const PlaylistDetail = ({ navigation, route, globalState = { tags: [] } }: PageProps) => {
  const dispatch = useDispatch();

  const { playlistId = '' } = route?.params || {};

  const edit = useRouteWithParams(routeNames.playlistEdit);
  const addToPlaylist = useRouteWithParams(routeNames.addItemsToPlaylist);
  const viewMediaItemById = useViewMediaItemById();
  const viewPlaylistItemById = useViewPlaylistItemById();
  const editPlaylistItemById = useEditPlaylistItemById();
  const goToShareWith = useRouteName(routeNames.shareWith);
  const goToPlaylists = usePlaylists();
  const playFromBeginning = useViewPlaylistItemById();

  const { loaded, selected } = useAppSelector((state) => state?.playlist);
  const [isLoaded, setIsLoaded] = useState(loaded);
  const [isSaved, setIsSaved] = useState(false);

  const appUserId = useAppSelector((state) => state?.user?.entity?._id);
  // @ts-ignore
  const {
    _id,
    title = '',
    authorProfile = {} as AuthorProfileDto,
    createdBy,
    description = '',
    imageSrc,
    category,
    shareCount = 0,
    viewCount = 0,
    likesCount = 0,
    // mediaItems = [],
  } = selected || {};

  const allowEdit = createdBy === appUserId;

  const { tags = [], build } = globalState;
  const tagKeys = (selected?.tags || []).map(({ key }) => key);
  const mappedTags = useMemo(() => mapAvailableTags(tags).filter((tag) => tag.isPlaylistTag), []);
  const availableTags = useMemo(() => mapAvailableTags(tags).filter((tag) => tag.isPlaylistTag), []);
  const initialPlaylistTags = getInitialPlaylistTags();
  const [selectedTagKeys, setSelectedTagKeys] = useState(initialPlaylistTags);

  const [actionMode, setActionMode] = useState(actionModes.default);
  const [isSelectable, setIsSelectable] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const playlistMediaItems = selectMappedPlaylistMediaItems(selected) || [];

  useEffect(() => {
    if (!isLoaded) {
      loadData().then();
    }
  }, [isLoaded]);

  const [clearSelectionKey, setClearSelectionKey] = useState(createRandomRenderKey());

  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  const [fabState, setFabState] = useState({ open: false });
  let fabActions;
  if (allowEdit) {
    fabActions = [
      { icon: 'delete-forever', onPress: () => setShowDeleteDialog(true), color: theme.colors.text, style: { backgroundColor: theme.colors.error } },
      { icon: 'share', onPress: () => sharePlaylist(), color: theme.colors.text, style: { backgroundColor: theme.colors.primary } },
      { icon: 'edit', onPress: () => editPlaylist(), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
    ];
  } else {
    fabActions = [{ icon: 'share', onPress: () => sharePlaylist(), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } }];
  }

  // Don't display anything unless we have a selected playlist
  // TODO: Show loader!
  if (!selected) {
    return null;
  }

  return (
    <PageContainer>
      <PageContent>
        <AppDialog
          leftActionLabel="Cancel"
          rightActionLabel="Delete"
          leftActionCb={() => setShowDeleteDialog(false)}
          rightActionCb={() => deletePlaylist()}
          onDismiss={() => setShowDeleteDialog(false)}
          showDialog={showDeleteDialog}
          title="Delete Playlist"
          subtitle="Are you sure you want to do this? This action is final and cannot be undone."
          color={theme.colors.white}
          buttonColor={theme.colors.error}
        />
        <ScrollView>
          <MediaCard
            key={_id}
            title={title}
            authorProfile={authorProfile}
            description={description}
            showThumbnail={true}
            thumbnail={imageSrc}
            thumbnailStyle={{
              // TODO: Can we do this automatically from video metadata?
              aspectRatio: 1 / 1
            }}
            category={category}
            availableTags={mappedTags}
            tags={tagKeys}
            showSocial={true}
            showActions={false}
            likes={likesCount}
            shares={shareCount}
            views={viewCount}
          >
            {/* TODO: Make this work and add it back in! */}
            {/* <Button
                icon="live-tv"
                color={theme.colors.default}
                mode="outlined"
                styles={{ width: '100%', marginTop: 25, marginBottom: 25 }}
                compact
                dark
                onPress={() => (playlistMediaItems && playlistMediaItems.length > 0 ? viewPlaylistMediaItem({ mediaId: playlistMediaItems[0]._id, uri: playlistMediaItems[0].uri }) : undefined)}
              >
                Play From Beginning
              </Button>
              <Divider /> */}
            {!allowEdit && playlistMediaItems.length > 0 && (
              <ActionButtons
                containerStyles={{ marginHorizontal: 0, marginVertical: 15 }}
                showSecondary={false}
                showPrimary={true}
                onPrimaryClicked={async () => {
                  playFromBeginning({ mediaId: playlistMediaItems[0]._id, uri: playlistMediaItems[0].uri });
                }}
                primaryLabel="Play from Beginning"
                primaryIcon="live-tv"
              />
            )}
            {!build.forFreeUser && allowEdit && (
              <ActionButtons
                containerStyles={{ marginHorizontal: 0, marginBottom: 15 }}
                showSecondary={Array.isArray(playlistMediaItems) && playlistMediaItems.length > 0}
                secondaryIcon="remove"
                onSecondaryClicked={() => (!isSelectable ? activateDeleteMode() : cancelDeletePlaylistItems())}
                secondaryIconColor={isSelectable ? theme.colors.primary : theme.colors.disabled}
                disablePrimary={actionMode === actionModes.delete}
                primaryLabel="Add Items To Playlist"
                primaryIcon={!(Array.isArray(playlistMediaItems) && playlistMediaItems.length > 0) ? 'playlist-add' : 'playlist-add'}
                onPrimaryClicked={() => addToPlaylist({ playlistId })}
              />
            )}
            <MediaList
              key={clearSelectionKey}
              list={playlistMediaItems}
              showThumbnail={true}
              selectable={isSelectable}
              showActions={!isSelectable}
              onViewDetail={activatePlaylistDetail}
              addItem={onAddItem}
              removeItem={onRemoveItem}
              actionIconRight={allowEdit ? 'edit' : undefined}
            />
          </MediaCard>
        </ScrollView>
        <PageActions>
          {isSelectable && (
            <ActionButtons
              onPrimaryClicked={confirmDeletePlaylistItems}
              onSecondaryClicked={cancelDeletePlaylistItems}
              primaryLabel="Remove"
              primaryIconColor={theme.colors.error}
              primaryButtonStyles={{ backgroundColor: theme.colors.error }}
            />
          )}
        </PageActions>
      </PageContent>
      {!build.forFreeUser && !isSelectable && (
        <FAB.Group
          visible={true}
          open={fabState.open}
          icon={fabState.open ? 'close' : 'more-vert'}
          actions={fabActions}
          color={theme.colors.text}
          fabStyle={{ backgroundColor: fabState.open ? theme.colors.default : theme.colors.primary }}
          onStateChange={(open) => {
            // open && setOpen(!open);
            setFabState(open);
          }}
          onPress={() => undefined}
        />
      )}
    </PageContainer>
  );

  async function loadData() {
    await dispatch(getPlaylistById(playlistId));
    await dispatch(loadUsers());
    setIsLoaded(true);
  }

  async function sharePlaylist() {
    await dispatch(selectPlaylist({ isChecked: true, plist: selected as PlaylistResponseDto }));
    goToShareWith();
  }

  // TODO: This is unused! Implement or remove ASAP!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function cancelSharePlaylist() {
    dispatch(selectPlaylist({ isChecked: false, plist: selected as PlaylistResponseDto }));
  }

  async function editPlaylist() {
    edit({ playlistId });
  }

  async function deletePlaylist() {
    await dispatch(removeUserPlaylist(playlistId));
    await dispatch(getUserPlaylists());
    await goToPlaylists();
  }

  function hasPlaylistItemRecord(item) {
    return item._id === item.playlistItemId;
  }

  function activatePlaylistDetail(item) {
    console.log('activatePlaylistDetail');
    console.log(item);
    return allowEdit
      ? editPlaylistMediaItem({ playlistItemId: item.playlistItemId, mediaId: item.mediaItemId, uri: item.uri, playlistId })
      : hasPlaylistItemRecord(item)
      ? viewPlaylistMediaItem({ playlistItemId: item._id, uri: item.uri })
      : viewPlaylistMediaItem({ mediaId: item._id, uri: item.uri });
  }

  async function viewPlaylistMediaItem({ playlistItemId = undefined, mediaId = undefined, uri = undefined }) {
    console.log('viewPlaylistMediaItem');
    if (playlistItemId) {
      viewPlaylistItemById({ playlistItemId, uri });
    } else if (mediaId) {
      viewMediaItemById({ mediaId, uri });
    }
  }

  async function editPlaylistMediaItem({ playlistItemId = undefined, playlistId = undefined, mediaId = undefined, uri = undefined }) {
    console.log('editPlaylistMediaItem');
    let itemId = playlistItemId || mediaId;
    if (!playlistItemId) {
      // Create the playlist item
      console.log('creating playlist item');
      const { payload } = (await dispatch(addPlaylistItem({ playlistId, mediaId, sortIndex: 0 }))) as any;
      console.log('dumping payload');
      itemId = payload._id;
      console.log(payload);
      console.log('reload playlist');
      await dispatch(getPlaylistById(playlistId));
    }
    editPlaylistItemById({ playlistItemId: itemId });
  }

  async function savePlaylistItems() {
    // We manage by mediaItemId, as the _id can be either a playlistItemId or a mediaItemId
    const mediaIds = playlistMediaItems.map((item) => item.mediaItemId) || [];
    if (isSelectable) {
      const filtered = mediaIds.filter((id) => !selectedItems.includes(id));
      await saveWithIds(filtered);
    } else {
      await saveWithIds(mediaIds);
    }

    setIsLoaded(false);
    await loadData();
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

  function getInitialPlaylistTags() {
    return (
      selected?.tags
      ?.map((tag) => {
        return tag ? tag?.key : undefined;
      })
      .filter((tag) => !!tag) || []
    );
  }

  function onAddItem(item: PlaylistItem) {
    const updatedItems = selectedItems.concat([item.mediaId]);
    setSelectedItems(updatedItems);
  }

  function onRemoveItem(selected: PlaylistItem) {
    const updatedItems = selectedItems.filter((item) => item !== selected.mediaId);
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

  function resetData() {
    setSelectedItems([]);
  }

  function clearAndGoBack() {
    navigation.goBack();
    resetData();
  }
};

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(PlaylistDetail));
