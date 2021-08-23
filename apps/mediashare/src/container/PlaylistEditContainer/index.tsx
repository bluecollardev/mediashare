import * as React from 'react';
import PlaylistEdit from '../../screens/PlaylistEdit';

export interface PlaylistEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface PlaylistEditContainerState {}

const PlaylistEditContainer = (props) => {
  return <PlaylistEdit navigation={props.navigation} />;
};

export default PlaylistEditContainer;
