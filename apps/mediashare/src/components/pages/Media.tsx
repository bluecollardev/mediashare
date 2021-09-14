import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { List } from 'native-base';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { findMediaItems } from '../../state/modules/media-items';

import { useRouteName, useRouteWithParams } from '../../hooks/NavigationHooks';
// import { TopActionButtons } from '../../layout/TopActionButtons';
import { MediaListItem } from '../layout/MediaListItem';

import { MediaItem, MediaItemDto } from '../../rxjs-api';

import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, FAB, Subheading } from 'react-native-paper';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { PageContainer, PageProps } from '../layout/PageContainer';

import { theme } from '../../styles';

export const MediaComponent = ({ onViewDetail, list, selectable }: { navigation: any; list: MediaItemDto[]; onViewDetail: any; selectable: boolean }) => {
  const sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  return (
    <View>
      <List>
        {sortedList.map((item, idx) => {
          const { title, description, thumbnail } = item;
          return (
            <MediaListItem
              key={`item-${idx}`}
              title={title}
              description={description}
              showThumbnail={true}
              image={thumbnail}
              selectable={selectable}
              onViewDetail={() => onViewDetail(item)}
            />
          );
        })}
      </List>
    </View>
  );
};

export const Media = ({ navigation }: PageProps) => {
  const forceUpdate = true;
  const dispatch = useDispatch();

  const addFromFeed = useRouteName(ROUTES.addFromFeed);
  const addMedia = useRouteName(ROUTES.addMediaItem);
  const editMedia = useRouteWithParams(ROUTES.mediaItemEdit);

  const { loaded, mediaItems } = useAppSelector((state) => state.mediaItems);

  const [isLoaded, setIsLoaded] = useState(forceUpdate || loaded);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(findMediaItems());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(findMediaItems());
      setIsLoaded(true);
    }
  }, [isLoaded, dispatch]);
  const [state, setState] = useState({ open: false });

  const fabActions = [
    { icon: 'delete', onPress: () => {}, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.error } },
    { icon: 'cloud-upload', onPress: addFromFeed, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
    { icon: 'library-add', onPress: addMedia, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
  ];

  return (
    <PageContainer>
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
        open={state.open}
        icon={state.open ? 'close' : 'more-vert'}
        actions={fabActions}
        color={theme.colors.primaryTextLighter}
        fabStyle={{ backgroundColor: state.open ? theme.colors.error : theme.colors.primary }}
        onStateChange={(open) => {
          // open && setOpen(!open);
          setState(open);
        }}
        // onPress={() => setOpen(!open)}
      />
    </PageContainer>
  );

  async function onEditItem(item: MediaItem) {
    editMedia({ mediaId: item._id, uri: item.uri });
  }
};

export default withLoadingSpinner(Media);
