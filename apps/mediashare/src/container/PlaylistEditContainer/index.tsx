import { Button, Container, Content, Icon, Text, View } from 'native-base';
import * as React from 'react';
import styles from '../../screens/Home/styles';

import PlaylistEdit from '../../screens/PlaylistEdit/index';
import { routeConfig } from '../../routes';
import ActionButtons from '../../components/layout/ActionButtons';
import { useAppSelector } from '../../state';
import { useDispatch } from 'react-redux';
import { createPlaylist } from '../../state/modules/create-playlist';
import { clearMediaItemSelection, findMediaItems } from '../../state/modules/media-items';
import { findUserPlaylists } from '../../state/modules/playlists/index';

export interface PlaylistEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface PlaylistEditContainerState {}

const PlaylistEditContainer = ({ navigation }) => {
  const dispatch = useDispatch();
  const createPlaylistState = useAppSelector((state) => state.createPlaylist);

  const hasMediaItems = createPlaylistState.mediaIds.length > 0;
  const actionCb = async () => {
    if (hasMediaItems) {
      const res = await dispatch(createPlaylist(createPlaylistState));
      dispatch(clearMediaItemSelection());
      dispatch(findUserPlaylists({}));

      navigation.navigate('Playlists');
    }
    if (!hasMediaItems) {
      navigation.navigate(routeConfig.addFromFeed.name, { state: 'create' });
    }
  };
  const cancelCb = navigation.goBack;
  const actionLabel = 'Next';
  const cancelLabel = 'Cancel';
  return (
    <Container style={styles.container}>
      <Content>
        <View padder>
          <PlaylistEdit navigation={navigation} />
          <ActionButtons actionCb={() => actionCb()} cancelCb={cancelCb} actionLabel={actionLabel} cancelLabel={cancelLabel} />
        </View>
      </Content>
    </Container>
  );
};

export default PlaylistEditContainer;
