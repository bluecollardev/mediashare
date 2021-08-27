import * as React from 'react';
import { useDispatch } from 'react-redux';
import Library from '../../screens/Library';

import { findMediaItems, getMediaItemById, selectMediaItem } from '../../state/modules/media-items';

import { useAppSelector } from '../../state/index';
import { Button, Container, Content, Icon, Text, View } from 'native-base';
import { routeConfig, ROUTES } from '../../routes';
import styles from '../../screens/Home/styles';
import { useEffect, useState } from 'react';
import { useRouteName, useRouteWithParams } from '../../hooks/NavigationHooks';
import { ListActionButton } from '../../components/layout/ListActionButton';
import ActionButtons from '../../components/layout/ActionButtons';
import TopActionButtons from '../../components/layout/TopActionButtons';
import { MediaItem } from '../../rxjs-api';

export interface LibraryContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}
const LibraryContainer = (props: { navigation: any }) => {
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
      <TopActionButtons leftAction={addFromFeed} rightAction={addMedia} leftLabel="Add from Feed" rightLabel="Add Media" />

      <Library navigation={props.navigation} list={mediaItems} onViewDetail={onViewItem} />
      <ListActionButton actionCb={() => addFromLibrary()} label={'Add to Playlist'} icon="add" />
    </Container>
  );
};

export default LibraryContainer;
