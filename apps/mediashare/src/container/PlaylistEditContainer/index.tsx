import { Content, View, Text, Button } from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';
import PlaylistEdit from '../../screens/PlaylistEdit';

export interface PlaylistEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface PlaylistEditContainerState {}

const PlaylistEditContainer = (props) => {
  console.log(props);
  return <PlaylistEdit navigation={props.navigation} />;
};

export default PlaylistEditContainer;
