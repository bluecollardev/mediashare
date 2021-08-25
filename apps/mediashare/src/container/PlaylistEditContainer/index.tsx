import { Button, Container, Content, Icon, Text, View } from 'native-base';
import * as React from 'react';
import styles from '../../screens/Home/styles';

import PlaylistEdit from '../../screens/PlaylistEdit/index';
import { routeConfig } from '../../routes';
import ActionButtons from '../../components/layout/ActionButtons';
import { useAppSelector } from '../../state';
import { useDispatch } from 'react-redux';
import { createPlaylist } from '../../state/modules/create-playlist';

export interface PlaylistEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface PlaylistEditContainerState {}

const PlaylistEditContainer = (props) => {
  const dispatch = useDispatch();
  const createPlaylistState = useAppSelector((state) => state.createPlaylist);
  const hasMediaItems = createPlaylistState.mediaIds.length > 0;
  const actionCb = () => {
    if (hasMediaItems) {
      dispatch(createPlaylist(createPlaylistState));
    }
    props.navigation.navigate(hasMediaItems ? routeConfig.playlistDetail : routeConfig.addFromFeed.name);
  };
  const cancelCb = props.navigation.goBack;
  const actionLabel = 'Next';
  const cancelLabel = 'Cancel';
  return (
    <Container style={styles.container}>
      <Content>
        <View padder>
          <PlaylistEdit navigation={props.navigation} />
          <ActionButtons actionCb={() => actionCb()} cancelCb={cancelCb} actionLabel={actionLabel} cancelLabel={cancelLabel} />
        </View>
      </Content>
    </Container>
  );
};

export default PlaylistEditContainer;
