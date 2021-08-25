import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Playlists from '../../screens/Playlists';

import { findUserPlaylists, selectPlaylistAction } from '../../state/modules/playlists';
import { routeConfig } from '../../routes';

import { useAppSelector } from '../../state';

export interface PlaylistsContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}

export const PlaylistsContainer = ({ navigation }) => {
  const dispatch = useDispatch();
  const playlists = useAppSelector((state) => state.playlists);

  if (!playlists.loading && playlists.userPlaylists.length < 1) {
    dispatch(findUserPlaylists({}));
  }

  const onViewDetailClicked = (item) => {
    dispatch(selectPlaylistAction(item));
    navigation.navigate(routeConfig.playlistDetail.name, { playlistId: item._id });
  };
  return <Playlists navigation={navigation} list={playlists.userPlaylists} onViewDetailClicked={onViewDetailClicked} />;
};

export default PlaylistsContainer;
