import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Content, List, Text, View } from 'native-base';

import { ROUTES } from '../../../routes';

import { useAppSelector } from '../../../state';
import { findMediaItems } from '../../../state/modules/media-items';

import { useRouteName, useRouteWithParams } from '../../../hooks/NavigationHooks';
import { TopActionButtons } from '../../layout/TopActionButtons';
import { MediaListItem } from '../../layout/MediaListItem';

import { MediaItem, MediaItemDto } from '../../../rxjs-api';

import styles from './styles';

export interface MediaContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}

export const Media = ({ onViewDetail, list }: { navigation: any; list: MediaItemDto[]; onViewDetail: any }) => {
  if (!list) {
    return <Text>...loading</Text>;
  }

  const sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  return (
    <Content>
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
                onViewDetail={() => onViewDetail(item)}
              />
            );
          })}
        </List>
      </View>
    </Content>
  );
};

export const MediaContainer = (props: { navigation: any }) => {
  const dispatch = useDispatch();
  const addFromMedia = useRouteName(ROUTES.addFromMedia);
  const addFromFeed = useRouteName(ROUTES.addFromFeed);
  const addMedia = useRouteName(ROUTES.addMediaItem);
  const viewMedia = useRouteWithParams(ROUTES.mediaItemDetail);

  const { loaded, mediaItems } = useAppSelector((state) => state.mediaItems);

  const [isLoaded, setIsLoaded] = useState(loaded);
  const onViewItem = async function (item: MediaItem) {
    viewMedia({ mediaId: item._id, uri: item.uri });
  };

  useEffect(() => {
    if (!isLoaded) {
      dispatch(findMediaItems());
      setIsLoaded(true);
    }
  }, [isLoaded, dispatch]);

  return (
    <Container style={styles.container}>
      <TopActionButtons leftAction={addFromFeed} rightAction={addMedia} leftLabel="Add from Feed" rightLabel="Upload" />
      <Media navigation={props.navigation} list={mediaItems} onViewDetail={onViewItem} />
      {/* <ListActionButton actionCb={addFromMedia} label={'Add to Playlist'} icon="plus" /> */}
    </Container>
  );
};

export default MediaContainer;
