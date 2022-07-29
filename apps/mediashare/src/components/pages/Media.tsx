import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, FlatList, View } from 'react-native';
import { routeNames } from 'mediashare/routes';
import { useAppSelector } from 'mediashare/store';
import { deleteMediaItem } from 'mediashare/store/modules/mediaItem';
import { findMediaItems } from 'mediashare/store/modules/mediaItems';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { withPlaylistSearch } from 'mediashare/components/hoc/withPlaylistSearch';
import { useRouteName, useEditMediaItemById } from 'mediashare/hooks/navigation';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { AuthorProfileDto, MediaItem, MediaItemResponseDto } from 'mediashare/rxjs-api';
import { RefreshControl } from 'react-native';
import { FAB, Divider } from 'react-native-paper';
import {
  PageContainer,
  PageProps,
  KeyboardAvoidingPageContent,
  PageActions,
  MediaListItem,
  ActionButtons,
  NoItems,
  AppDialog,
  NoContent,
} from 'mediashare/components/layout';
import { createRandomRenderKey } from 'mediashare/core/utils/uuid';
import { selectMediaItem } from 'mediashare/store/modules/mediaItems';
import { theme } from 'mediashare/styles';

export const MediaComponent = ({
  list = [],
  selectable,
  showActions = true,
  onViewDetail,
  onChecked = () => undefined,
}: {
  navigation: any;
  list: MediaItemResponseDto[];
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
    const { _id = '', title = '', authorProfile = {} as AuthorProfileDto, description = '', thumbnail } = item;
    return (
      <>
        <MediaListItem
          key={`media_item_${_id}`}
          title={title}
          titleStyle={styles.titleText}
          description={<MediaListItem.Description data={{ authorProfile, description }} />}
          showThumbnail={true}
          image={thumbnail}
          showPlayableIcon={false}
          showActions={showActions}
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

const MediaComponentWithSearch = withPlaylistSearch(MediaComponent);

export const Media = ({ navigation, globalState }: PageProps) => {
  const dispatch = useDispatch();

  const addFromFeed = useRouteName(routeNames.addFromFeed);
  const addMedia = useRouteName(routeNames.mediaItemAdd);
  const editMedia = useEditMediaItemById();

  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(refresh, [dispatch]);

  const { entities, selected, loaded, loading } = useAppSelector((state) => state?.mediaItems);

  const [clearSelectionKey, setClearSelectionKey] = useState(createRandomRenderKey());
  useEffect(() => {
    clearCheckboxSelection();
    loadData().then();
  }, []);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [fabState, setState] = useState({ open: false });
  const fabActions = [
    { icon: 'delete-forever', onPress: activateDeleteMode, color: theme.colors.text, style: { backgroundColor: theme.colors.error } },
    { icon: 'cloud-download', onPress: addFromFeed, color: theme.colors.text, style: { backgroundColor: theme.colors.primary } },
    { icon: 'add-circle', onPress: addMedia, color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
  ];

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <AppDialog
          leftActionLabel="Cancel"
          rightActionLabel="Delete"
          leftActionCb={() => closeDeleteDialog()}
          rightActionCb={() => confirmItemsToDelete()}
          onDismiss={closeDeleteDialog}
          showDialog={showDeleteDialog}
          title="Delete Media Items"
          subtitle="Are you sure you want to do this? This action is final and cannot be undone."
          color={theme.colors.white}
          buttonColor={theme.colors.error}
        />
        <MediaComponentWithSearch
          globalState={globalState}
          loaded={(!loaded && !loading) || (loaded && entities.length > 0)}
          loadData={loadData}
          searchTarget="media"
          key={clearSelectionKey}
          navigation={navigation}
          list={entities}
          showActions={!isSelectable}
          selectable={isSelectable}
          onViewDetail={onEditItem}
          onChecked={updateSelection}
        />
        {loaded && entities.length === 0 && (
          <NoContent
            onPress={addMedia}
            messageButtonText="You have not added any media items to your library. Please add and item to your library to continue."
            icon="add-circle"
          />
        )}
      </KeyboardAvoidingPageContent>
      {isSelectable && actionMode === actionModes.delete && (
        <PageActions>
          <ActionButtons
            onPrimaryClicked={openDeleteDialog}
            onSecondaryClicked={cancelItemsToDelete}
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
            // open && setOpen(!open);
            setState(open);
          }}
          // onPress={() => setOpen(!open)}
        />
      )}
    </PageContainer>
  );

  /**
   * We use server-side filtering for text, and client-side filtering on tags.
   * This will change once we have cloud search on tags implemented.
   */
  async function loadData() {
    const { search } = globalState;
    const args = {
      text: search?.filters?.text ? search.filters.text : '',
      tags: search?.filters?.tags || [],
    };

    await dispatch(findMediaItems(args));
  }

  async function refresh() {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }

  async function onEditItem(item: MediaItem) {
    editMedia({ mediaId: item._id, uri: item.uri });
  }

  function activateDeleteMode() {
    setActionMode(actionModes.delete);
    setIsSelectable(true);
  }

  function openDeleteDialog() {
    setShowDeleteDialog(true);
  }

  function closeDeleteDialog() {
    cancelItemsToDelete();
    setShowDeleteDialog(false);
  }

  async function confirmItemsToDelete() {
    await deleteItems();
    closeDeleteDialog();
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  function cancelItemsToDelete() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  async function deleteItems() {
    selected.map(async (item) => {
      await dispatch(deleteMediaItem({ id: item._id, key: item.uri }));
    }); // TODO: Find a real way to do this
    setTimeout(() => {
      loadData();
    }, 2500);
  }

  async function updateSelection(bool, item) {
    await dispatch(selectMediaItem({ isChecked: bool, item: item }));
  }

  function clearCheckboxSelection() {
    const randomKey = createRandomRenderKey();
    setClearSelectionKey(randomKey);
  }
};

export default withLoadingSpinner((state) => {
  return !!state?.mediaItems?.loading || false;
})(withGlobalStateConsumer(Media));

const styles = StyleSheet.create({
  titleText: {
    marginBottom: 2,
    color: theme.colors.text,
    fontSize: 15,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  deleteActionButton: {
    backgroundColor: theme.colors.error,
  },
});
