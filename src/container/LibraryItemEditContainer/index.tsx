import * as React from 'react';
import { connect } from 'react-redux';
import LibraryItemEdit from '../../screens/LibraryItemEdit';
import { fetchList } from './actions';

export interface LibraryItemEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface LibraryItemEditContainerState {}

class LibraryItemEditContainer extends React.Component<
  LibraryItemEditContainerProps,
  LibraryItemEditContainerState
> {
  componentDidMount() {
    this.props.fetchList();
  }
  render() {
    return (
      <LibraryItemEdit
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
  data: state.libraryItemDetail.list,
  isLoading: state.libraryItemDetail.isLoading
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryItemEditContainer);
