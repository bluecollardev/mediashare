import * as React from 'react';
import { connect } from 'react-redux';
import Playlists from '../../screens/Playlists';
import datas from './data';
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
    this.props.fetchList(datas);
  }
  render() {
    return (
      <Playlists navigation={this.props.navigation} list={this.props.data} />
    );
  }
}

function bindAction(dispatch: any) {
  return {
    fetchList: (url: any) => dispatch(fetchList(url))
  };
}

const mapStateToProps = (state: any) => ({
  data: state.HomeReducer.list,
  isLoading: state.HomeReducer.isLoading
});
export default connect(mapStateToProps, bindAction)(PlaylistsContainer);
