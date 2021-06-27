import * as React from 'react';
import { connect } from 'react-redux';
import Playlists from '../../screens/Playlists';

import { findUserPlaylists } from '../../state/modules/playlists';
import { routeConfig } from '../../routes';

export interface PlaylistsContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}
export interface PlaylistsContainerState {}

class PlaylistsContainer extends React.Component<PlaylistsContainerProps, PlaylistsContainerState> {
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

  render() {
    const { navigation, data } = this.props;
    return <Playlists navigation={navigation} list={data} onViewDetailClicked={this.onViewDetailClicked} />;
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
