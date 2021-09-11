import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Playlists from '../../screens/Playlists';

import { findUserPlaylists } from '../../state/modules/playlists';
import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { Container, Text } from 'native-base';
import styles from '../../screens/Home/styles';
import TopActionButtons from '../../components/layout/TopActionButtons';
import { useRouteName, useRouteWithParams } from '../../hooks/NavigationHooks';
import { ListActionButton } from '../../components/layout/ListActionButton';
import { selectPlaylistAction } from '../../state/modules/playlists/index';
import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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

  const [loaded, setLoaded] = useState(false);

  const loadData = async function () {
    await dispatch(findUserPlaylists({}));

    setLoaded(true);
  };
  const selectedPlaylists = useAppSelector((state) => state.playlists.selectedPlaylists);

  const updateSelection = function (bool, item) {
    dispatch(selectPlaylistAction({ isChecked: bool, plist: item }));
    console.log(selectedPlaylists);
  };

  useEffect(() => {
    if (!loaded) {
      loadData();
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  if (!loaded) {
    return <Text>Loading</Text>;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <Container style={styles.container}>
      <TopActionButtons leftAction={createPlaylistAction} rightAction={shareWithAction} leftLabel="Create Playlist" rightLabel="Share Playlist" />

      <ScrollView contentContainerStyle={styles.scrollView} refreshControl={<RefreshControl refreshing={!loaded} onRefresh={loadData} />}>
        <Playlists onChecked={updateSelection} list={playlists.userPlaylists} onViewDetailClicked={(item) => viewPlaylistAction({ playlistId: item._id })} />
      </ScrollView>
      <ListActionButton actionCb={shareWithAction} label="Share With User" icon="share" />
    </Container>
  );
};

export default PlaylistsContainer;
