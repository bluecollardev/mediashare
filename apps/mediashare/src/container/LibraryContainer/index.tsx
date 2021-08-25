import * as React from 'react';
import { useDispatch } from 'react-redux';
import Library from '../../screens/Library';

import { findMediaItems } from '../../state/modules/media-items';

import { useAppSelector } from '../../state/index';
import { Text } from 'native-base';

export interface LibraryContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}
const LibraryContainer = (props: { navigation: any }) => {
  const dispatch = useDispatch();

  const { loaded, loading, mediaItems } = useAppSelector((state) => state.mediaItems);

  if (!loaded && !loading && mediaItems.length < 1) {
    console.log('dispatched');
    dispatch(findMediaItems());
  }

  return <>{loading ? <Text>...loading</Text> : <Library navigation={props.navigation} list={mediaItems} />}</>;
};

export default LibraryContainer;
