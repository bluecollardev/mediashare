import * as React from 'react';
import { connect } from 'react-redux';
import Library from '../../screens/Library';
import datas from './data';
import { fetchList } from './actions';
export interface LibraryContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface LibraryContainerState {}
class LibraryContainer extends React.Component<
  LibraryContainerProps,
  LibraryContainerState
> {
  componentDidMount() {
    this.props.fetchList(datas);
  }
  render() {
    return (
      <Library navigation={this.props.navigation} list={this.props.data} />
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
export default connect(mapStateToProps, bindAction)(LibraryContainer);
