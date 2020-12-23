import * as React from 'react';
import { connect } from 'react-redux';
import PlaylistEdit from '../../screens/PlaylistEdit';
import { fetchList } from './actions';
export interface PlaylistEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface PlaylistEditContainerState {}
class PlaylistEditContainer extends React.Component<
  PlaylistEditContainerProps,
  PlaylistEditContainerState
> {
  componentDidMount() {
    this.props.fetchList();
  }
  render() {
    return (
      <PlaylistEdit
        navigation={this.props.navigation}
        list={this.props.data}
      />
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchList: (url: any) => dispatch(fetchList(url))
  };
}

const mapStateToProps = (state: any) => ({
  data: state.playlistEdit.list,
  isLoading: state.playlistEdit.isLoading
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistEditContainer);
