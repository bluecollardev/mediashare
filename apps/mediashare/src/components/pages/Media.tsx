import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { findMediaItems } from '../../state/modules/media-items';

import { useRouteName, useEditMediaItem } from '../../hooks/NavigationHooks';

import { MediaItem, MediaItemDto } from '../../rxjs-api';

import { RefreshControl } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { PageContainer, PageProps, KeyboardAvoidingPageContent, PageActions } from '../layout/PageContainer';
import { MediaListItem } from '../layout/MediaListItem';

import { theme } from '../../styles';
import { shortenText } from '../../utils';
import { ActionButtons } from '../layout/ActionButtons';
import { NoItems } from '../layout/NoItems';

export const MediaComponent = ({
  onViewDetail,
  list = [],
  selectable,
  showActions = true,
}: {
  navigation: any;
  list: MediaItemDto[];
  onViewDetail: any;
  selectable: boolean;
  showActions?: boolean;
}) => {
  const sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  return (
    <View>
      {sortedList.map((item) => {
        const { _id, title, author, description, thumbnail } = item;
        return (
          <MediaListItem
            key={`item_${_id}`}
            title={title}
            description={
              <View>
                {/* <Text style={styles.author}>By {getAuthorText(creator)}</Text> */}
                {/* <Text style={styles.username}>By @{author}</Text> */}
                <Text style={styles.description}>{shortenText(description, 40)}</Text>
              </View>
            }
            showThumbnail={true}
            showActions={showActions}
            image={thumbnail}
            iconRight="edit"
            iconRightColor={theme.colors.accentDarker}
            selectable={selectable}
            onViewDetail={() => onViewDetail(item)}
          />
        );
      })}
    </View>
  );
};

const actionModes = { delete: 'delete', default: 'default' };

export const Media = ({ navigation }: PageProps) => {
  const addFromFeed = useRouteName(ROUTES.addFromFeed);
  const addMedia = useRouteName(ROUTES.addMediaItem);
  const editMedia = useEditMediaItem();

  const dispatch = useDispatch();

  const { loaded, entities } = useAppSelector((state) => state.mediaItems);
  const [isLoaded, setIsLoaded] = useState(loaded);
  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(refresh, [dispatch]);
  useEffect(() => {
    if (!isLoaded) {
      loadData();
    }
  }, [isLoaded, dispatch]);

  const [fabState, setState] = useState({ open: false });
  const fabActions = [
    { icon: 'delete', onPress: activateDeleteMode, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.disabled } },
    { icon: 'cloud-download', onPress: addFromFeed, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.accent } },
    { icon: 'library-add', onPress: addMedia, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.accent } },
  ];

  const [clearSelectionKey, setClearSelectionKey] = useState(Math.random());
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
            onViewDetail={onEditItem}
            selectable={isSelectable}
            showActions={!isSelectable}
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
          color={theme.colors.primaryTextLighter}
          fabStyle={{ backgroundColor: fabState.open ? theme.colors.error : theme.colors.primary }}
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
    const args = { text: '' };
    console.log(`Media.loadData > Dispatch findMediaItems with args: ${JSON.stringify(args, null, 2)}`);
    dispatch(findMediaItems(args));
    setIsLoaded(true);
  }

  async function refresh() {
    setRefreshing(true);
    const args = { text: '' };
    console.log(`Media.refresh > Dispatch findMediaItems with args: ${JSON.stringify(args, null, 2)}`);
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
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  async function cancelDelete() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  function clearCheckboxSelection() {
    const randomKey = Math.random();
    setClearSelectionKey(randomKey);
  }
};

export default withLoadingSpinner(Media);

const styles = StyleSheet.create({
  author: {
    color: '#666',
    fontSize: 12,
    marginBottom: 2,
  },
  username: {
    color: theme.colors.primary,
    fontSize: 12,
    marginBottom: 4,
  },
  description: {
    color: '#666666',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
  videoCount: {
    color: '#666666',
    fontSize: 12,
    marginBottom: 2,
    fontWeight: 'bold',
  },
});
