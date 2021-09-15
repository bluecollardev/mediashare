import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { List } from 'native-base';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { findMediaItems } from '../../state/modules/media-items';

import { useRouteName, useRouteWithParams, useEditMediaItem } from '../../hooks/NavigationHooks';
import { MediaListItem } from '../layout/MediaListItem';

import { MediaItem, MediaItemDto } from '../../rxjs-api';

import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, FAB, Searchbar, Subheading } from 'react-native-paper';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { PageContainer, PageProps } from '../layout/PageContainer';

import { theme } from '../../styles';
import { shortenText } from '../../utils';

export const MediaComponent = ({ onViewDetail, list = [], selectable }: { navigation: any; list: MediaItemDto[]; onViewDetail: any; selectable: boolean }) => {
  const sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  return (
    <View>
      <List>
        {sortedList.map((item, idx) => {
          const { title, description, thumbnail, uri } = item;
          return (
            <MediaListItem
              key={`item_${idx}`}
              title={title}
              description={`${shortenText(description, 40)}`}
              showThumbnail={true}
              image={thumbnail || uri}
              selectable={selectable}
              onViewDetail={() => onViewDetail(item)}
            />
          );
        })}
      </List>
    </View>
  );
};

export const Media = ({ navigation, onDataLoaded }: PageProps) => {
  const addFromFeed = useRouteName(ROUTES.addFromFeed);
  const addMedia = useRouteName(ROUTES.addMediaItem);
  const editMedia = useEditMediaItem();

  const dispatch = useDispatch();

  const { loaded, mediaItems } = useAppSelector((state) => state.mediaItems);
  const [isLoaded, setIsLoaded] = useState(loaded);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(refresh, [dispatch]);
  useEffect(() => {
    if (!isLoaded) {
      loadData().then(onDataLoaded);
    }
  }, [isLoaded, dispatch, onDataLoaded]);

  const [fabState, setState] = useState({ open: false });
  const fabActions = [
    { icon: 'cloud-upload', onPress: addFromFeed, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
    { icon: 'library-add', onPress: addMedia, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
    { icon: 'edit', onPress: () => {}, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.accent } },
  ];

  return (
    <PageContainer>
      {/*<Searchbar style={{ marginBottom: 15 }} placeholder="" value={''} />*/}
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {loaded && mediaItems.length > 0 ? (
          <MediaComponent navigation={navigation} list={mediaItems} onViewDetail={onEditItem} selectable={false} />
        ) : (
          <Card>
            <Card.Content>
              <Subheading style={{ textAlign: 'center' }}>There are no items in your collection.</Subheading>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
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
};

export default withLoadingSpinner(Media);
