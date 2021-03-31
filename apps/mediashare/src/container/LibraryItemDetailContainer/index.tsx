import * as React from 'react';
import { connect } from 'react-redux';
import LibraryItemDetail from '../../screens/LibraryItemDetail';

export interface LibraryItemDetailContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface LibraryItemDetailContainerState {}

class LibraryItemDetailContainer extends React.Component<
  LibraryItemDetailContainerProps,
  LibraryItemDetailContainerState
> {
  componentDidMount() {
    // this.props.fetchList();
  }
  render() {
    return <LibraryItemDetail navigation={this.props.navigation} list={this.props.data} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    // fetchList: (url: any) => dispatch(fetchList(url)),
  };
}

const mapStateToProps = (state: any) => ({
  data: state && state.libraryItemDetail ? state.libraryItemDetail.list : [],
  isLoading: state && state.isLoading ? state.libraryItemDetail.isLoading : false,
});
export default connect(mapStateToProps, mapDispatchToProps)(LibraryItemDetailContainer);
