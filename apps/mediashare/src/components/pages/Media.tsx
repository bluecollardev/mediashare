import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, FlatList, View } from 'react-native';

import { routeNames } from '../../routes';

import { useAppSelector } from '../../store';
import { deleteMediaItem, findMediaItems } from '../../store/modules/media-items';

import { withGlobalStateConsumer } from '../../core/globalState';

import { useRouteName, useEditMediaItem } from '../../hooks/NavigationHooks';

import { MediaItem, MediaItemDto } from '../../rxjs-api';

import { RefreshControl } from 'react-native';
import { FAB, Text, Divider } from 'react-native-paper';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { PageContainer, PageProps, KeyboardAvoidingPageContent, PageActions } from '../layout/PageContainer';
import { MediaListItem } from '../layout/MediaListItem';
import { ActionButtons } from '../layout/ActionButtons';
import { NoItems } from '../layout/NoItems';

import { shortenText } from '../../utils';
import { createRandomRenderKey } from '../../core/utils';

import { theme } from '../../styles';
import { selectMediaItem } from '../../store/modules/media-items';

export const MediaComponent = ({
  list = [],
  selectable,
  showActions = true,
  onViewDetail,
  onChecked = () => undefined
}: {
  navigation: any;
  list: MediaItemDto[];
  onViewDetail: any;
  selectable: boolean;
  showActions?: boolean;
  onChecked?: (checked: boolean, item?: any) => void;
}) => {
  const sortedList = list.map((item) => item) || [];
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  return (
    <View>
      <FlatList data={sortedList} renderItem={({ item }) => renderVirtualizedListItem(item)} keyExtractor={({ _id }) => `media_item_${_id}`} />
    </View>
  );

  function renderVirtualizedListItem(item) {
    const { _id = '', title = '', author, description = '', thumbnail } = item;
    return (
      <>
        <MediaListItem
          key={`media_item_${_id}`}
          title={title}
          description={
            <>
              {author && <Text style={styles.username}>By @{author}</Text>}
              <Text style={styles.description}>{shortenText(description, 52)}</Text>
            </>
          }
          showThumbnail={true}
          showActions={showActions}
          image={thumbnail}
          iconRight="edit"
          iconRightColor={theme.colors.default}
          selectable={selectable}
          onViewDetail={() => onViewDetail(item)}
          onChecked={(checked) => onChecked(checked, item)}
        />
        <Divider key={`media_item_divider_${_id}`} />
      </>
    );
  }
};

const actionModes = { delete: 'delete', default: 'default' };

export const Media = ({ navigation, globalState }: PageProps) => {
  // console.log(`Media > Dump current search filters: ${JSON.stringify(globalState?.search, null, 2)}`);

  const addFromFeed = useRouteName(routeNames.addFromFeed);
  const addMedia = useRouteName(routeNames.mediaItemAdd);
  const editMedia = useEditMediaItem();

  const dispatch = useDispatch();

  const { loaded, entities, selected } = useAppSelector((state) => state.mediaItems);
  const [isLoaded, setIsLoaded] = useState(loaded);
  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(refresh, [dispatch]);
  const [prevSearchFilters, setPrevSearchFilters] = useState({ filters: { text: '' } });
  useEffect(() => {
    const currentSearchFilters = globalState?.search;
    if (!isLoaded || currentSearchFilters !== prevSearchFilters) {
      setPrevSearchFilters(currentSearchFilters);
      loadData();
    }
  }, [isLoaded, globalState]);

  const [fabState, setState] = useState({ open: false });
  const fabActions = [
    { icon: 'delete-forever', onPress: activateDeleteMode, color: theme.colors.text, style: { backgroundColor: theme.colors.error } },
    { icon: 'cloud-download', onPress: addFromFeed, color: theme.colors.text, style: { backgroundColor: theme.colors.primary } },
    { icon: 'library-add', onPress: addMedia, color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
  ];

  const [clearSelectionKey, setClearSelectionKey] = useState(createRandomRenderKey());
  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {loaded && entities.length > 0 ? (
          <MediaComponent
            key={clearSelectionKey}
            navigation={navigation}
            list={entities}
            showActions={!isSelectable}
            selectable={isSelectable}
            onViewDetail={onEditItem}
            onChecked={updateSelection}
          />
        ) : (
          <NoItems />
        )}
      </KeyboardAvoidingPageContent>
      {isSelectable && actionMode === actionModes.delete && (
        <PageActions>
          <ActionButtons actionCb={confirmDelete} cancelCb={cancelDelete} actionLabel="Delete" cancelLabel="Cancel" rightIcon="delete" />
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
            // open && setOpen(!open);
            setState(open);
          }}
          // onPress={() => setOpen(!open)}
        />
      )}
    </PageContainer>
  );

  async function loadData() {
    const { search } = globalState;
    const args = { text: search?.filters?.text ? search.filters.text : '' };
    // console.log(`Media.loadData > Dispatch findMediaItems with args: ${JSON.stringify(args, null, 2)}`);
    // console.log(globalState);
    dispatch(findMediaItems(args));
    setIsLoaded(true);
  }

  async function refresh() {
    setRefreshing(true);
    const { search } = globalState;
    const args = { text: search?.filters?.text ? search.filters.text : '' };
    // console.log(`Media.refresh > Dispatch findMediaItems with args: ${JSON.stringify(args, null, 2)}`);
    // console.log(globalState);
    await dispatch(findMediaItems(args));
    setRefreshing(false);
  }

  async function onEditItem(item: MediaItem) {
    editMedia({ mediaId: item._id, uri: item.uri });
  }

  async function activateDeleteMode() {
    setActionMode(actionModes.delete);
    setIsSelectable(true);
  }

  async function confirmDelete() {
    await deleteItems();
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  async function cancelDelete() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  async function deleteItems() {
    selected.map(async (item) => {
      await dispatch(deleteMediaItem({ id: item._id, key: item.uri }));
    }) // TODO: Find a real way to do this
    setTimeout(() => {
      loadData()
    }, 2500)
  }

  async function updateSelection(bool, item) {
    await dispatch(selectMediaItem({ isChecked: bool, item: item }));
  }

  function clearCheckboxSelection() {
    const randomKey = createRandomRenderKey();
    setClearSelectionKey(randomKey);
  }
};

export default withLoadingSpinner(withGlobalStateConsumer(Media));

const styles = StyleSheet.create({
  author: {
    color: theme.colors.textDarker,
    fontSize: 12,
    marginBottom: 2,
  },
  username: {
    color: theme.colors.primary,
    fontSize: 12,
    marginBottom: 4,
  },
  description: {
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
});
