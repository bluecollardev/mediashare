import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { routeNames } from 'mediashare/routes';
import { useAppSelector } from 'mediashare/store';
import { removeUserPlaylist } from 'mediashare/store/modules/playlist';
import { getUserPlaylists, findPlaylists, selectPlaylist } from 'mediashare/store/modules/playlists';
import { PlaylistResponseDto } from 'mediashare/rxjs-api';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { useRouteName, useViewPlaylistById } from 'mediashare/hooks/NavigationHooks';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { FAB, Text, Divider } from 'react-native-paper';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { View } from 'react-native';
import {
  PageActions,
  PageContainer,
  KeyboardAvoidingPageContent,
  PageProps,
  MediaListItem,
  ActionButtons,
  NoItems,
  AppDialog,
} from 'mediashare/components/layout';
import { getAuthorText, getUsername, shortenText } from 'mediashare/utils';
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
    const { _id = '', title = '', author = '', description = '', mediaIds = [], imageSrc = '' } = item;
    return (
      <>
        <MediaListItem
          key={`playlist_${_id}`}
          title={title}
          titleStyle={styles.titleText}
          description={() => {
            return (
              <View style={styles.details}>
                {!!author && <Text style={styles.username}>By {author}</Text>}
                <Text style={{ ...styles.description }}>{shortenText(description || '', 80)}</Text>
                <Text style={{ ...styles.videoCount }}>{mediaIds?.length || 0} videos</Text>
              </View>
            );
          }}
          showThumbnail={true}
          image={imageSrc}
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

export const Playlists = ({ globalState }: PageProps) => {
  const dispatch = useDispatch();

  const shareWith = useRouteName(routeNames.shareWith);
  const createPlaylist = useRouteName(routeNames.playlistAdd);
  const viewPlaylist = useViewPlaylistById();

  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);
  const [refreshing, setRefreshing] = useState(false);

  // TODO: A generic data loader is a good idea, but we can do it later, use useAppSelector for now
  // const [{ state, loaded }] = useLoadPlaylistData();
  const { loading, loaded, entities = [] as any[], selected = [] as any[] } = useAppSelector((state) => state?.userPlaylists);
  const [isLoaded, setIsLoaded] = useState(loaded);
  useEffect(() => {
    if (loaded && !isLoaded) {
      setIsLoaded(true);
    }
  }, [loaded]);

  const onRefresh = useCallback(refresh, [dispatch]);
  const searchFilters = globalState?.search?.filters || { text: '', tags: [] };
  const [prevSearchFilters, setPrevSearchFilters] = useState({ filters: { text: '', tags: [] } });
  useEffect(() => {
    const currentSearchFilters = globalState?.search;
    if (!isLoaded || JSON.stringify(currentSearchFilters) !== JSON.stringify(prevSearchFilters)) {
      setPrevSearchFilters(currentSearchFilters);
      loadData().then();
    }
  }, [isLoaded, globalState, searchFilters]);

  const [clearSelectionKey, setClearSelectionKey] = useState(createRandomRenderKey());
  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [
    { icon: 'delete-forever', onPress: () => activateDeleteMode(), color: theme.colors.text, style: { backgroundColor: theme.colors.error } },
    { icon: 'share', onPress: () => activateShareMode(), color: theme.colors.text, style: { backgroundColor: theme.colors.primary } },
    { icon: 'library-add', onPress: () => createPlaylist(), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
  ];

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
        />
        {isLoaded ? (
          <PlaylistsComponent
            key={clearSelectionKey}
            list={entities}
            onViewDetailClicked={(item) => viewPlaylist({ playlistId: item._id })}
            selectable={isSelectable}
            showActions={!isSelectable}
            onChecked={updateSelection}
          />
        ) : (
          <NoItems text={loading ? 'Loading...' : 'You have not created any playlists yet.'} />
        )}
      </KeyboardAvoidingPageContent>
      {isSelectable && actionMode === actionModes.share && (
        <PageActions>
          <ActionButtons
            onActionClicked={confirmPlaylistsToShare}
            onCancelClicked={cancelPlaylistsToShare}
            actionLabel="Share With"
            actionIcon="group"
          />
        </PageActions>
      )}
      {isSelectable && actionMode === actionModes.delete && (
        <PageActions>
          <ActionButtons
            onActionClicked={openDeleteDialog}
            onCancelClicked={cancelPlaylistsToDelete}
            actionLabel="Delete"
            actionIcon="delete"
            actionButtonStyles={styles.deleteActionButton}
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
      await dispatch(findPlaylists(args));
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
    marginBottom: 2,
    color: theme.colors.text,
    fontSize: 14,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  author: {
    color: theme.colors.textDarker,
    fontSize: 12,
    marginBottom: 2,
  },
  username: {
    flex: 0,
    width: '100%',
    color: theme.colors.primary,
    fontSize: 12,
    marginBottom: 4,
  },
  description: {
    flex: 0,
    width: '100%',
    color: theme.colors.textDarker,
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
  videoCount: {
    color: theme.colors.textDarker,
    fontSize: 12,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  deleteActionButton: {
    backgroundColor: theme.colors.error,
  },
});
