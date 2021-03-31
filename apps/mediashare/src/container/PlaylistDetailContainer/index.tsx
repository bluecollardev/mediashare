import * as React from 'react';
import { connect } from 'react-redux';
import PlaylistDetail from '../../screens/PlaylistDetail';

export interface PlaylistDetailContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface PlaylistDetailContainerState {}

class PlaylistDetailContainer extends React.Component<PlaylistDetailContainerProps, PlaylistDetailContainerState> {
  componentDidMount() {
    // this.props.fetchList();
  }
  render() {
    return <PlaylistDetail navigation={this.props.navigation} list={this.props.data} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    // fetchList: (url: any) => dispatch(fetchList(url)),
  };
}

const mapStateToProps = (state: any) => ({
  data: state && state.playlistDetail ? state.playlistDetail.list : [],
  isLoading: state && state.playlistDetail ? state.playlistDetail.isLoading : false,
});
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetailContainer);
