import { MultiSelectIcon } from 'mediashare/components/form';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { useDispatch } from 'react-redux';
import { routeNames } from 'mediashare/routes';
import { useAppSelector } from 'mediashare/store';
import { getUserPlaylists, findPlaylists, selectPlaylist } from 'mediashare/store/modules/playlists';
import { AuthorProfileDto, PlaylistResponseDto } from 'mediashare/rxjs-api';
import { GlobalStateProps, withGlobalStateConsumer } from 'mediashare/core/globalState';
import { useRouteName, useViewPlaylistById } from 'mediashare/hooks/navigation';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { FAB, Divider, Appbar, Card, Searchbar } from 'react-native-paper';
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
import { components, theme } from 'mediashare/styles';

export interface SearchProps {
  list: PlaylistResponseDto[];
  selectable?: boolean;
  clearSelection?: boolean;
  showActions?: boolean;
  onViewDetailClicked?: Function;
  onChecked?: (checked: boolean, item?: any) => void;
  globalState?: GlobalStateProps;
}

export const SearchComponent = ({ list = [], onViewDetailClicked, selectable = false, showActions = true, onChecked = () => undefined }: SearchProps) => {


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
};

const actionModes = { share: 'share', delete: 'delete', default: 'default' };

export const Search = ({ globalState }: PageProps) => {
  const dispatch = useDispatch();

  const shareWith = useRouteName(routeNames.shareWith);
  const createPlaylist = useRouteName(routeNames.playlistAdd);
  const viewPlaylist = useViewPlaylistById();

  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);
  const [refreshing, setRefreshing] = useState(false);

  // TODO: A generic data loader is a good idea, but we can do it later, use useAppSelector for now
  // const [{ state, loaded }] = useLoadPlaylistData();
  const { entities = [] as any[], selected = [] as any[], loaded, loading } = useAppSelector((state) => state?.userPlaylists);

  const onRefresh = useCallback(refresh, [dispatch]);
  const searchFilters = globalState?.search?.filters || { text: '', tags: [] };
  const [prevSearchFilters, setPrevSearchFilters] = useState({ filters: { text: '', tags: [] } });
  useEffect(() => {
    const currentSearchFilters = globalState?.search;
    if (!loaded || JSON.stringify(currentSearchFilters) !== JSON.stringify(prevSearchFilters)) {
      setPrevSearchFilters(currentSearchFilters);
      loadData().then();
    }
  }, [loaded, globalState, searchFilters]);

  const [clearSelectionKey, setClearSelectionKey] = useState(createRandomRenderKey());
  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  const { setSearchFilters } = globalState;
  const searchIsFiltering = globalState?.search?.filters?.text !== '' || globalState?.search?.filters?.tags?.length > 0;
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchTags, setSearchTags] = useState([]);

  const searchTarget = 'playlists';

  const mappedTags = useMemo(() => {
    const availableTags = Array.isArray(globalState?.tags) ? globalState.tags : [];
    if (searchTarget === 'playlists') return availableTags.filter((tag) => tag.isPlaylistTag);
    if (searchTarget === 'media') return availableTags.filter((tag) => tag.isMediaTag);
    return availableTags;
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
        <Card>
          <Card.Content>
            <Searchbar
              style={{ width: '100%', marginTop: 15 }}
              inputStyle={{ fontSize: 15 }}
              placeholder="Keywords"
              value={searchText}
              onChangeText={(text) => updateSearchText(text)}
              onIconPress={() => closeSearchConsole()}
              icon=""
              // icon="arrow-back-ios"
              clearIcon="clear"
              autoCapitalize="none"
            />
            {/* <Appbar.Action icon="close" onPress={() => closeSearchConsole()} /> */}
            <SectionedMultiSelect
              colors={components.multiSelect.colors}
              styles={components.multiSelect.styles}
              items={mappedTags}
              IconRenderer={MultiSelectIcon}
              uniqueKey="key"
              displayKey="value"
              subKey="children"
              searchPlaceholderText="Enter Text"
              selectText="Select Tags"
              confirmText="Done"
              onSelectedItemsChange={updateSearchTags}
              selectedItems={searchTags}
              expandDropDowns={false}
              readOnlyHeadings={false}
              showDropDowns={true}
              parentChipsRemoveChildren={true}
              showCancelButton={true}
              modalWithTouchable={false}
              modalWithSafeAreaView={false}
            />
            <Divider />
            {(!loaded && !loading) || (loaded && entities.length > 0) ? (
              <SearchComponent
                key={clearSelectionKey}
                list={entities}
                onViewDetailClicked={(item) => viewPlaylist({ playlistId: item._id })}
                selectable={isSelectable}
                showActions={!isSelectable}
                onChecked={updateSelection}
              />
            ) : loaded && entities.length === 0 ? (
              <NoContent
                onPress={() => createPlaylist()}
                messageButtonText="You have not created any playlists yet. Please create a playlist, or search for a community one to continue."
                icon="add-circle"
              />
            ) : null}
          </Card.Content>
        </Card>
      </KeyboardAvoidingPageContent>
      {isSelectable && actionMode === actionModes.share && (
        <PageActions>
          <ActionButtons onActionClicked={confirmPlaylistsToShare} onCancelClicked={cancelPlaylistsToShare} actionLabel="Share With" actionIcon="group" />
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

  function updateSelection(bool, item) {
    dispatch(selectPlaylist({ isChecked: bool, plist: item }));
  }

  function clearCheckboxSelection() {
    const randomKey = createRandomRenderKey();
    setClearSelectionKey(randomKey);
  }

  function openSearchConsole() {
    setSearchIsActive(true);
  }

  function closeSearchConsole() {
    setSearchIsActive(false);
  }

  function updateSearchText(value) {
    // Set the in-component state value
    setSearchText(value);
  }

  function updateSearchTags(values) {
    // Set the in-component state value
    setSearchTags(values);
  }

  function submitSearch() {
    // Update global search filters
    setSearchFilters({ text: searchText, tags: [...searchTags] });
    closeSearchConsole(); // Close the search
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
