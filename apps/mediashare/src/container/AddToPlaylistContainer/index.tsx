import * as React from 'react';
import { connect } from 'react-redux';
import AddToPlaylist from '../../screens/AddToPlaylist';

export interface AddToPlaylistContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface AddToPlaylistContainerState {}

class AddToPlaylistContainer extends React.Component<AddToPlaylistContainerProps, AddToPlaylistContainerState> {
  componentDidMount() {
    // this.props.fetchList();
  }
  render() {
    return <AddToPlaylist navigation={this.props.navigation} list={this.props.data} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    // fetchList: (url: any) => dispatch(fetchList(url)),
  };
}

const mapStateToProps = (state: any) => ({
  data: state && state.playlists ? state.playlists.list : [],
  isLoading: state && state.playlists ? state.playlists.isLoading : false,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddToPlaylistContainer);
