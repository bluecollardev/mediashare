import * as React from 'react';
import { connect } from 'react-redux';
import AddFromLibrary from '../../screens/AddFrom';
import { fetchList } from './actions';
export interface AddFromLibraryContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface AddFromLibraryContainerState {}
class AddFromLibraryContainer extends React.Component<
  AddFromLibraryContainerProps,
  AddFromLibraryContainerState
> {
  componentDidMount() {
    this.props.fetchList();
  }
  render() {
    return (
      <AddFromLibrary
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
  data: state.playlistDetail.list,
  isLoading: state.playlistDetail.isLoading
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFromLibraryContainer);
