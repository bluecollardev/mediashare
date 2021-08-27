import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import Playlists from '../../screens/Playlists';

import { findUserPlaylists } from '../../state/modules/playlists';
import { routeConfig, ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { useEffect, useState } from 'react';
import { Container, Content, View, Button, Icon, Text } from 'native-base';
import styles from '../../screens/Home/styles';
import TopActionButtons from '../../components/layout/TopActionButtons';
import { useRouteName, useRouteWithParams } from '../../hooks/NavigationHooks';
import { mapPlaylists } from '../../screens/Playlists/index';
import { ListActionButton } from '../../components/layout/ListActionButton';

export interface PlaylistsContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}

export const PlaylistsContainer = () => {
  const dispatch = useDispatch();

  const shareWithAction = useRouteName(ROUTES.shareWith);
  const createPlaylistAction = useRouteName(ROUTES.playlistAdd);
  const viewPlaylistAction = useRouteWithParams(ROUTES.playlistDetail);
  const playlists = useAppSelector((state) => state.playlists);
  const initLoaded = useAppSelector((state) => state.playlists.loaded);

  const [loaded, setLoaded] = useState(false);

  const loadData = async function () {
    await dispatch(findUserPlaylists({}));

    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) {
      loadData();
      setLoaded(true);
    }
  }, [loaded]);

  if (!loaded) {
    return <Text>Loading</Text>;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <Container style={styles.container}>
      <TopActionButtons leftAction={createPlaylistAction} rightAction={shareWithAction} leftLabel="Create Playlist" rightLabel="Share Playlist" />

      <Content>
        <Playlists list={playlists.userPlaylists} onViewDetailClicked={(item) => viewPlaylistAction({ playlistId: item._id })} />
      </Content>
      <ListActionButton actionCb={shareWithAction} label="Share With User" icon="share" />
    </Container>
  );
};

export default PlaylistsContainer;
