import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { routeNames } from 'mediashare/routes';
import { useAppSelector } from 'mediashare/store';
import { getUserPlaylists, findPlaylists, selectPlaylist } from 'mediashare/store/modules/playlists';
import { AuthorProfileDto, PlaylistResponseDto } from 'mediashare/rxjs-api';
import { GlobalStateProps, withGlobalStateConsumer } from 'mediashare/core/globalState';
import { useRouteName, useViewPlaylistById } from 'mediashare/hooks/navigation';
import { withPlaylistSearch } from 'mediashare/components/hoc/withPlaylistSearch';
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
} from 'mediashare/components/layout';
import { createRandomRenderKey } from 'mediashare/core/utils/uuid';
import { theme } from 'mediashare/styles';

export interface SearchProps {
  list: PlaylistResponseDto[];
  selectable?: boolean;
  clearSelection?: boolean;
  showActions?: boolean;
  onViewDetailClicked?: Function;
  onChecked?: (checked: boolean, item?: any) => void;
  globalState?: GlobalStateProps;
}

export const SearchComponent = withPlaylistSearch(({ list = [], onViewDetailClicked, selectable = false, showActions = true, onChecked = () => undefined }: SearchProps) => {
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
          showActions={showActions}
          selectable={selectable}
          onViewDetail={() => onViewDetailClicked(item)}
          onChecked={(checked) => onChecked(checked, item)}
        />
        <Divider key={`playlist_divider_${item._id}`} />
      </>
    );
  }
});

const actionModes = { share: 'share', delete: 'delete', default: 'default' };

export const Search = ({ globalState }: PageProps) => {
  const dispatch = useDispatch();

  const shareWith = useRouteName(routeNames.shareWith);
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

  const [fabState, setFabState] = useState({ open: false });
  const fabActions =
    entities.length > 0
      ? [
          { icon: 'share', onPress: () => activateShareMode(), color: theme.colors.text, style: { backgroundColor: theme.colors.primary } },
        ]
      : [];

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <SearchComponent
          globalState={globalState}
          loaded={loaded}
          loadData={loadData}
          forcedSearchMode={true}
          key={clearSelectionKey}
          list={entities}
          onViewDetailClicked={(item) => viewPlaylist({ playlistId: item._id })}
          selectable={isSelectable}
          showActions={!isSelectable}
          onChecked={updateSelection}
        />
        {loaded && entities.length === 0 && (
          <NoContent
            messageButtonText="Search for playlists and media to add to your collection."
            icon="info"
          />
        )}
      </KeyboardAvoidingPageContent>
      {isSelectable && actionMode === actionModes.share && (
        <PageActions>
          <ActionButtons onActionClicked={confirmPlaylistsToShare} onCancelClicked={cancelPlaylistsToShare} actionLabel="Share With" actionIcon="group" />
        </PageActions>
      )}
      {!isSelectable && entities.length > 0 && (
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
})(withGlobalStateConsumer(Search));

const styles = StyleSheet.create({
  titleText: {
    marginBottom: 4,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  deleteActionButton: {
    backgroundColor: theme.colors.error,
  },
});
