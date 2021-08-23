import { Storage } from 'aws-amplify';
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import Library from '../../screens/Library';

import { findMediaItems } from '../../state/modules/media-items';
import { useState, useEffect } from 'react';
import { RootState } from '../../state';
import { useAppSelector } from '../../state/index';
import { Text } from 'native-base';

export interface LibraryContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}
export interface LibraryContainerState {}
const LibraryContainer = (props: { navigation: any }) => {
  const dispatch = useDispatch();

  const mediaItems = useAppSelector((state) => state.mediaItems);

  console.log(props);
  if (!mediaItems?.loading && mediaItems?.mediaItems?.length < 1) {
    dispatch(findMediaItems());
  }

  return <>{mediaItems.loading ? <Text>...loading</Text> : <Library navigation={props.navigation} list={mediaItems.mediaItems} />}</>;
};

export default LibraryContainer;
