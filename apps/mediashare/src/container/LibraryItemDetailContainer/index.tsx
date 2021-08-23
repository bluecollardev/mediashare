import { Text } from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';
import LibraryItemDetail from '../../screens/LibraryItemDetail';
import { useAppSelector } from '../../state';

export interface LibraryItemDetailContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface LibraryItemDetailContainerState {}

const LibraryItemDetailContainer = (props) => {
  const mediaItem = useAppSelector((state) => state.mediaItem);
  if (mediaItem.loading) {
    return <Text>...loading</Text>;
  }

  return <LibraryItemDetail navigation={props.navigation} item={mediaItem.selectedMediaItem} src={mediaItem.getMediaItem} />;
};

export default LibraryItemDetailContainer;
