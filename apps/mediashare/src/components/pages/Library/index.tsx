import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Content, List, Text, View } from 'native-base';

import { ROUTES } from '../../../routes';

import { useAppSelector } from '../../../state';
import { findMediaItems, getMediaItemById, selectMediaItem } from '../../../state/modules/media-items';

import { useRouteName, useRouteWithParams } from '../../../hooks/NavigationHooks';
import { TopActionButtons } from '../../layout/TopActionButtons';
import { ListActionButton } from '../../layout/ListActionButton';
import { MediaListItem } from '../../layout/MediaListItem';

import { MediaItem, MediaItemDto } from '../../../rxjs-api';

import styles from './styles';

export interface LibraryContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}

export const Library = ({ onViewDetail, list }: { navigation: any; list: MediaItemDto[]; onViewDetail: any }) => {
  // const dispatch = useDispatch();
  return (
    <Content>
      <View>
        <List>
          {list.map((item, idx) => {
            const { title, description, thumbnail } = item;
            return <MediaListItem key={`item-${idx}`} title={title} description={description} image={thumbnail} onViewDetail={() => onViewDetail(item)} />;
          })}
        </List>
      </View>
    </Content>
  );
};

export const LibraryContainer = (props: { navigation: any }) => {
  const dispatch = useDispatch();
  const addFromLibrary = useRouteName(ROUTES.addFromLibrary);
  const addFromFeed = useRouteName(ROUTES.addFromFeed);
  const addMedia = useRouteName(ROUTES.addMediaItem);
  const viewMedia = useRouteWithParams(ROUTES.libraryItemDetail);

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
      <Library navigation={props.navigation} list={mediaItems} onViewDetail={onViewItem} />
      <ListActionButton actionCb={addFromLibrary} label={'Add to Playlist'} icon="add" />
    </Container>
  );
};

export default LibraryContainer;
