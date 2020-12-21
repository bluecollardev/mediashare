import * as React from 'react';
import { connect } from 'react-redux';
import LibraryItemDetail from '../../screens/LibraryItemDetail';
import datas from './data';
import { fetchList } from './actions';
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
    this.props.fetchList(datas);
  }
  render() {
    return (
      <LibraryItemDetail
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
export default connect(mapStateToProps, bindAction)(LibraryItemDetailContainer);
