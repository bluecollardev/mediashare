import { withPlaylistSearch } from 'mediashare/components/hoc/withPlaylistSearch';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { routeNames } from 'mediashare/routes';
import { useAppSelector } from 'mediashare/store';
import { removeUserPlaylist } from 'mediashare/store/modules/playlist';
import { getUserPlaylists, findUserPlaylists, selectPlaylist } from 'mediashare/store/modules/playlists';
import { AuthorProfileDto, PlaylistResponseDto } from 'mediashare/rxjs-api';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { useRouteName, useViewPlaylistById } from 'mediashare/hooks/navigation';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { FAB, Divider } from 'react-native-paper';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import {
  PageActions,
  PageContainer,
  KeyboardAvoidingPageContent,
  PageProps,
  MediaListItem,
  ActionButtons,
  NoContent,
  AppDialog,
} from 'mediashare/components/layout';
import { createRandomRenderKey } from 'mediashare/core/utils/uuid';
import { theme } from 'mediashare/styles';

export interface PlaylistsProps {
  list: PlaylistResponseDto[];
  selectable?: boolean;
  clearSelection?: boolean;
  showActions?: boolean;
  onViewDetailClicked?: Function;
  onChecked?: (checked: boolean, item?: any) => void;
}

export const PlaylistsComponent = ({ list = [], onViewDetailClicked, selectable = false, showActions = true, onChecked = () => undefined }: PlaylistsProps) => {
  const sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  return <FlatList data={sortedList} renderItem={({ item }) => renderVirtualizedListItem(item)} keyExtractor={({ _id }) => `playlist_${_id}`} />;

  function renderVirtualizedListItem(item) {
    // TODO: Can we have just one or the other, either mediaIds or mediaItems?
    const { _id = '', title = '', authorProfile = {} as AuthorProfileDto, description = '', mediaIds = [], mediaItems = [], imageSrc = '' } = item;
    return (
      <>
        <MediaListItem
          key={`playlist_${_id}`}
          title={title}
          titleStyle={styles.titleText}
          description={<MediaListItem.Description data={{ authorProfile, itemCount: mediaIds?.length || mediaItems?.length || 0 }} showItemCount={true} />}
          showThumbnail={true}
          image={imageSrc}
          showPlayableIcon={false}
          showActions={showActions}
          selectable={selectable}
          onViewDetail={() => onViewDetailClicked(item)}
          onChecked={(checked) => onChecked(checked, item)}
        />
        <Divider key={`playlist_divider_${item._id}`} />
      </>
    );
  }
};

const actionModes = { share: 'share', delete: 'delete', default: 'default' };

const PlaylistsComponentWithSearch = withPlaylistSearch(PlaylistsComponent);

export const Playlists = ({ globalState }: PageProps) => {
  const dispatch = useDispatch();

  const shareWith = useRouteName(routeNames.shareWith);
  const createPlaylist = useRouteName(routeNames.playlistAdd);
  const viewPlaylist = useViewPlaylistById();

  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(refresh, [dispatch]);

  const { entities = [] as any[], selected = [] as any[], loaded, loading } = useAppSelector((state) => state?.userPlaylists);

  const [clearSelectionKey, setClearSelectionKey] = useState(createRandomRenderKey());
  useEffect(() => {
    clearCheckboxSelection();
    loadData().then();
  }, []);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [fabState, setFabState] = useState({ open: false });
  const fabActions =
    entities.length > 0
      ? [
          { icon: 'delete-forever', onPress: () => activateDeleteMode(), color: theme.colors.text, style: { backgroundColor: theme.colors.error } },
          { icon: 'share', onPress: () => activateShareMode(), color: theme.colors.text, style: { backgroundColor: theme.colors.primary } },
          { icon: 'add-circle', onPress: () => createPlaylist(), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
        ]
      : [{ icon: 'add-circle', onPress: () => createPlaylist(), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } }];

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <AppDialog
          leftActionLabel="Cancel"
          rightActionLabel="Delete"
          leftActionCb={() => closeDeleteDialog()}
          rightActionCb={() => confirmPlaylistsToDelete()}
          onDismiss={closeDeleteDialog}
          showDialog={showDeleteDialog}
          title="Delete Playlists"
          subtitle="Are you sure you want to do this? This action is final and cannot be undone."
          color={theme.colors.white}
          buttonColor={theme.colors.error}
        />
        <PlaylistsComponentWithSearch
          globalState={globalState}
          loaded={(!loaded && !loading) || (loaded && entities.length > 0)}
          loadData={loadData}
          searchTarget="playlists"
          key={clearSelectionKey}
          list={entities}
          onViewDetailClicked={(item) => viewPlaylist({ playlistId: item._id })}
          selectable={isSelectable}
          showActions={!isSelectable}
          onChecked={updateSelection}
        />
        {loaded && entities.length === 0 && (
          <NoContent
            onPress={() => createPlaylist()}
            messageButtonText="You have not created any playlists yet. Please create a playlist, or search for a community one to continue."
            icon="add-circle"
          />
        )}
      </KeyboardAvoidingPageContent>
      {isSelectable && actionMode === actionModes.share && (
        <PageActions>
          <ActionButtons onPrimaryClicked={confirmPlaylistsToShare} onSecondaryClicked={cancelPlaylistsToShare} primaryLabel="Share With" primaryIcon="group" />
        </PageActions>
      )}
      {isSelectable && actionMode === actionModes.delete && (
        <PageActions>
          <ActionButtons
            onPrimaryClicked={openDeleteDialog}
            onSecondaryClicked={cancelPlaylistsToDelete}
            primaryLabel="Delete"
            primaryIcon="delete"
            primaryButtonStyles={styles.deleteActionButton}
          />
        </PageActions>
      )}
      {!isSelectable && (
        <FAB.Group
          visible={true}
          open={fabState.open}
          icon={fabState.open ? 'close' : 'more-vert'}
          actions={fabActions}
          color={theme.colors.text}
          fabStyle={{ backgroundColor: fabState.open ? theme.colors.default : theme.colors.primary }}
          onStateChange={(open) => {
            setFabState(open);
          }}
        />
      )}
    </PageContainer>
  );

  async function loadData() {
    const { search } = globalState;
    const args = {
      text: search?.filters?.text ? search.filters.text : '',
      tags: search?.filters?.tags || [],
    };

    if (args.text || args.tags.length > 0) {
      await dispatch(findUserPlaylists(args));
    } else {
      await dispatch(getUserPlaylists());
    }
  }

  async function refresh() {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }

  function activateShareMode() {
    setActionMode(actionModes.share);
    setIsSelectable(true);
  }

  function confirmPlaylistsToShare() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
    shareWith();
  }

  function cancelPlaylistsToShare() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  function activateDeleteMode() {
    setActionMode(actionModes.delete);
    setIsSelectable(true);
  }

  function openDeleteDialog() {
    setShowDeleteDialog(true);
  }

  function closeDeleteDialog() {
    cancelPlaylistsToDelete();
    setShowDeleteDialog(false);
  }

  async function confirmPlaylistsToDelete() {
    await deletePlaylists();
    closeDeleteDialog();
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  function cancelPlaylistsToDelete() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  async function deletePlaylists() {
    selected.map(async (item) => {
      await dispatch(removeUserPlaylist(item._id));
    }); // TODO: Find a real way to do this
    setTimeout(() => {
      loadData();
    }, 2500);
  }

  function updateSelection(bool, item) {
    dispatch(selectPlaylist({ isChecked: bool, plist: item }));
  }

  function clearCheckboxSelection() {
    const randomKey = createRandomRenderKey();
    setClearSelectionKey(randomKey);
  }
};

export default withLoadingSpinner((state) => {
  return !!state?.userPlaylists?.loading || false;
})(withGlobalStateConsumer(Playlists));

const styles = StyleSheet.create({
  titleText: {
    marginBottom: 4,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  deleteActionButton: {
    backgroundColor: theme.colors.error,
  },
});
