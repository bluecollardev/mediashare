import * as React from 'react';
import { connect } from 'react-redux';
import Playlists from '../../screens/Playlists';
import { fetchList } from './actions';

export interface PlaylistsContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface PlaylistsContainerState {}

class PlaylistsContainer extends React.Component<
  PlaylistsContainerProps,
  PlaylistsContainerState
> {
  componentDidMount() {
    this.props.fetchList();
  }
  render() {
    return (
      <Playlists navigation={this.props.navigation} list={this.props.data} />
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchList: (url: any) => dispatch(fetchList(url))
  };
}

const mapStateToProps = (state: any) => ({
  data: state.playlists.list,
  isLoading: state.playlists.isLoading
});
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsContainer);
