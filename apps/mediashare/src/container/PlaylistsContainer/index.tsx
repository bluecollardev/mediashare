import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Playlists from '../../screens/Playlists';

import { findUserPlaylists, selectPlaylistAction } from '../../state/modules/playlists';
import { routeConfig } from '../../routes';

import { useAppSelector } from '../../state';
import { useEffect, useState } from 'react';

export interface PlaylistsContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}

export const PlaylistsContainer = ({ navigation }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const playlists = useAppSelector((state) => state.playlists);

  useEffect(() => {
    if (!loaded) {
      dispatch(findUserPlaylists({}));
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const onViewDetailClicked = (item) => {
    dispatch(selectPlaylistAction(item));
    navigation.navigate(routeConfig.playlistDetail.name, { playlistId: item._id });
  };
  return <Playlists navigation={navigation} list={playlists.userPlaylists} onViewDetailClicked={onViewDetailClicked} />;
};

export default PlaylistsContainer;
