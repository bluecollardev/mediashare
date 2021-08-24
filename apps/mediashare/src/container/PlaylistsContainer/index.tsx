import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Playlists from '../../screens/Playlists';

import { findUserPlaylists } from '../../state/modules/playlists';
import { routeConfig } from '../../routes';

import { useAppSelector } from '../../state';

export interface PlaylistsContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}

export const PlaylistsContainer = (props) => {
  const dispatch = useDispatch();
  const playlists = useAppSelector((state) => state.playlists);

  const { navigation } = props;

  if (!playlists.loading && playlists.userPlaylists.length < 1) {
    dispatch(findUserPlaylists({}));
  }

  function onViewDetailClicked(id) {
    const { navigation } = this.props;
    navigation.navigate(routeConfig.playlistDetail.name, {
      playlistId: id,
    });
  }
  return <Playlists navigation={navigation} list={playlists.userPlaylists} onViewDetailClicked={onViewDetailClicked} />;
};

export default PlaylistsContainer;
