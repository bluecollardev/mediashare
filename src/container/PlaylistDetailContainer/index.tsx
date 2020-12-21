import * as React from 'react';
import { connect } from 'react-redux';
import PlaylistDetail from '../../screens/PlaylistDetail';
import datas from './data';
import { fetchList } from './actions';
export interface PlaylistDetailContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface PlaylistDetailContainerState {}
class PlaylistDetailContainer extends React.Component<
  PlaylistDetailContainerProps,
  PlaylistDetailContainerState
> {
  componentDidMount() {
    this.props.fetchList(datas);
  }
  render() {
    return (
      <PlaylistDetail
        navigation={this.props.navigation}
        list={this.props.data}
      />
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
export default connect(mapStateToProps, bindAction)(PlaylistDetailContainer);
