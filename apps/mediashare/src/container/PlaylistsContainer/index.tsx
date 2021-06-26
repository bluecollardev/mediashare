import * as React from 'react';
import { connect } from 'react-redux';
import Playlists from '../../screens/Playlists';

import { findUserPlaylists } from '../../state/modules/playlists';

export interface PlaylistsContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}
export interface PlaylistsContainerState {}

class PlaylistsContainer extends React.Component<PlaylistsContainerProps, PlaylistsContainerState> {
  componentDidMount() {
    const { fetchList } = this.props;
    fetchList();
  }
  render() {
    const { state } = this.props;
    return <Playlists navigation={this.props.navigation} list={this.props.data} />;
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
