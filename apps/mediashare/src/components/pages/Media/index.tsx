import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Content, List, Text, View } from 'native-base';

import { ROUTES } from '../../../routes';

import { useAppSelector } from '../../../state';
import { findMediaItems } from '../../../state/modules/media-items';

import { useRouteName, useRouteWithParams } from '../../../hooks/NavigationHooks';
import { TopActionButtons } from '../../layout/TopActionButtons';
import { MediaListItem } from '../../layout/MediaListItem';

import { MediaItem, MediaItemDto } from '../../../rxjs-api';

import PageContainer from '../../layout/PageContainer';
import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../../../styles';
import { Portal, FAB, Subheading } from 'react-native-paper';

export interface MediaContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
  selectable: boolean;
}

export const Media = ({ onViewDetail, list, selectable }: { navigation: any; list: MediaItemDto[]; onViewDetail: any; selectable: boolean }) => {
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

export const MediaContainer = (props: { navigation: any }) => {
  const dispatch = useDispatch();
  const addFromFeed = useRouteName(ROUTES.addFromFeed);
  const addMedia = useRouteName(ROUTES.addMediaItem);
  const viewMedia = useRouteWithParams(ROUTES.mediaItemDetail);

  const { loaded, mediaItems } = useAppSelector((state) => state.mediaItems);

  const [isLoaded, setIsLoaded] = useState(loaded);
  const onViewItem = async function (item: MediaItem) {
    viewMedia({ mediaId: item._id, uri: item.uri });
  };
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
    { icon: 'library-add', onPress: addFromFeed, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
    { icon: 'cloud-upload', onPress: addMedia, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
  ];

  return (
    <PageContainer>
      {/* <TopActionButtons leftAction={addFromFeed} rightAction={addMedia} leftLabel="Add from Feed" rightLabel="Upload" /> */}

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {mediaItems.length > 0 ? (
          <Media navigation={props.navigation} list={mediaItems} onViewDetail={onViewItem} selectable={false} />
        ) : (
          <Subheading>No Media Items</Subheading>
        )}
      </ScrollView>
      {/* <Portal> */}
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
      {/* </Portal> */}
    </PageContainer>
  );
};

export default MediaContainer;
