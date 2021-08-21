import * as React from 'react';
import { connect } from 'react-redux';
import Playlists from '../../screens/Playlists';

import { findUserPlaylists } from '../../state/modules/playlists';
import { routeConfig } from '../../routes';
import { useContext, useEffect, useState } from 'react';
import { apis } from '../../state/apis';
import { UserContext } from '../../state/user-context';
import { ApiContext } from '../../state/api-context';

export interface PlaylistsContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}

export const PlaylistsContainer = (props) => {
  const [data, setData] = useState([]);
  const user = useContext(UserContext);
  const apis = useContext(ApiContext);
  const { navigation } = props;
  async function getAllPlaylists() {
    const res = await apis.api.user.userControllerGetPlaylists({ hea }).toPromise();
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

class PlaylistsContainerClass extends React.Component<PlaylistsContainerProps, null> {
  constructor(props) {
    super(props);
    this.onViewDetailClicked = this.onViewDetailClicked.bind(this);
  }

  componentDidMount() {
    const { fetchList } = this.props;
    fetchList();
  }

  onViewDetailClicked(id) {
    const { navigation } = this.props;
    navigation.navigate(routeConfig.playlistDetail.name, {
      playlistId: id,
    });
  }
}

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
