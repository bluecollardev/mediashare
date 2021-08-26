import * as React from 'react';
import { connect } from 'react-redux';
import AddToPlaylist from '../../screens/AddToPlaylist';

export interface AddFromLibraryContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface AddFromLibraryContainerState {}

class AddFromLibraryContainer extends React.Component<AddFromLibraryContainerProps, AddFromLibraryContainerState> {
  componentDidMount() {
    // this.props.fetchList();
  }
  render() {
    const data = [{ title: 'this is a title', description: 'this is a description', image: '' }];
    return <AddToPlaylist navigation={this.props.navigation} list={data} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    // fetchList: (url: any) => dispatch(fetchList(url)),
  };
}

const mapStateToProps = (state: any) => ({
  data: state && state.playlistDetail ? state.playlistDetail.list : [],
  isLoading: state && state.playlistDetail ? state.playlistDetail.isLoading : [],
});
export default connect(mapStateToProps, mapDispatchToProps)(AddFromLibraryContainer);
