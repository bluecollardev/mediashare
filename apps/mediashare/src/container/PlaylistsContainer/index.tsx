import * as React from 'react';
import { connect } from 'react-redux';
import Playlists from '../../screens/Playlists';

import { findUserPlaylists } from '../../state/modules/playlists';
import { routeConfig } from '../../routes';
import { useContext, useEffect, useState } from 'react';
import { apis } from '../../state/apis';
import { UserContext } from '../../state/user-context';
import { useAppSelector } from '../../state';

export interface PlaylistsContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}

export const PlaylistsContainer = (props) => {
  const [data, setData] = useState([]);
  const user = useContext(UserContext);
  const { navigation } = props;
  const slice = useAppSelector((state) => state.user);

  async function getAllPlaylists() {
    const res = await apis.user.userControllerGetUserPlaylists().toPromise();
    setData(res);
  }

  useEffect(() => {
    getAllPlaylists();
  }, []);
  function onViewDetailClicked(id) {
    const { navigation } = this.props;
    navigation.navigate(routeConfig.playlistDetail.name, {
      playlistId: id,
    });
  }
  return <Playlists navigation={navigation} list={data} onViewDetailClicked={onViewDetailClicked} />;
};

function mapDispatchToProps(dispatch: any) {
  return {
    // @ts-ignore
    fetchList: () => dispatch(findUserPlaylists()),
  };
}

const mapStateToProps = (state: any) => ({
  state: state,
  data: state?.userPlaylists?.userPlaylists ? state.userPlaylists.userPlaylists : [],
  isLoading: state && state?.isLoading ? state?.userPlaylists.isLoading : false,
});
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsContainer);
