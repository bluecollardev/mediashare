import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { List } from 'native-base';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { findMediaItems } from '../../state/modules/media-items';

import { useRouteName, useEditMediaItem } from '../../hooks/NavigationHooks';

import { MediaItem, MediaItemDto } from '../../rxjs-api';

import { RefreshControl } from 'react-native';
import { Card, FAB, Subheading } from 'react-native-paper';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { PageContainer, PageProps, KeyboardAvoidingPageContent, PageActions } from '../layout/PageContainer';
import { MediaListItem } from '../layout/MediaListItem';

import { theme } from '../../styles';
import { shortenText } from '../../utils';
import { ActionButtons } from '../layout/ActionButtons';

export const MediaComponent = ({
  onViewDetail,
  list = [],
  isSelectable,
  showActions = true,
}: {
  navigation: any;
  list: MediaItemDto[];
  onViewDetail: any;
  isSelectable: boolean;
  showActions?: boolean;
}) => {
  const sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  return (
    <View>
      <List>
        {sortedList.map((item) => {
          const { _id, title, description, thumbnail } = item;
          return (
            <MediaListItem
              key={`item_${_id}`}
              title={title}
              description={`${shortenText(description, 40)}`}
              showThumbnail={true}
              showActions={showActions}
              image={thumbnail}
              iconRight="edit"
              iconRightColor={theme.colors.accentDarker}
              selectable={isSelectable}
              onViewDetail={() => onViewDetail(item)}
            />
          );
        })}
      </List>
    </View>
  );
};

const actionModes = { delete: 'delete', default: 'default' };

export const Media = ({ navigation, onDataLoaded }: PageProps) => {
  const addFromFeed = useRouteName(ROUTES.addFromFeed);
  const addMedia = useRouteName(ROUTES.addMediaItem);
  const editMedia = useEditMediaItem();

  const dispatch = useDispatch();

  const { loaded, mediaItems } = useAppSelector((state) => state.mediaItems);
  const [isLoaded, setIsLoaded] = useState(loaded);
  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(refresh, [dispatch]);
  useEffect(() => {
    if (!isLoaded) {
      loadData().then(onDataLoaded);
    }
  }, [isLoaded, dispatch, onDataLoaded]);

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
        {loaded && mediaItems.length > 0 ? (
          <MediaComponent
            key={clearSelectionKey}
            navigation={navigation}
            list={mediaItems}
            onViewDetail={onEditItem}
            isSelectable={isSelectable}
            showActions={!isSelectable}
          />
        ) : (
          <Card>
            <Card.Content>
              <Subheading style={{ textAlign: 'center' }}>There are no items in your collection.</Subheading>
            </Card.Content>
          </Card>
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
    dispatch(findMediaItems());
    setIsLoaded(true);
  }

  async function refresh() {
    setRefreshing(true);
    await dispatch(findMediaItems());
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
