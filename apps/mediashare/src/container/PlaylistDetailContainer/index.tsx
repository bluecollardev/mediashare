import * as React from 'react';
import { connect } from 'react-redux';
import PlaylistDetail from '../../screens/PlaylistDetail';
import { getUserPlaylistById } from '../../state/modules/playlists';

export interface PlaylistDetailContainerProps {
  navigation: any;
  route: any;
  fetchList: Function;
  data: Object;
  state: Object;
  playlistId: string | number; // TODO: Make a type
}
export interface PlaylistDetailContainerState {}

class PlaylistDetailContainer extends React.Component<PlaylistDetailContainerProps, PlaylistDetailContainerState> {
  componentDidMount() {
    const { fetchList } = this.props;
    const { playlistId } = this.props?.route?.params;
    fetchList(playlistId);
  }

  render() {
    const { state } = this.props;
    const { navigation, data } = this.props;
    return <PlaylistDetail navigation={navigation} list={data} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchList: (playlistId) => dispatch(getUserPlaylistById(String(playlistId))),
  };
}

const mapStateToProps = (state: any) => ({
  state: state,
  data: state && state.playlistDetail ? state.playlistDetail.list : [],
  isLoading: state && state.playlistDetail ? state.playlistDetail.isLoading : false,
});
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetailContainer);
