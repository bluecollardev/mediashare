import * as React from 'react';
import { connect } from 'react-redux';
import Library from '../../screens/Library';
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
    this.props.fetchList();
  }
  render() {
    return (
      <Library navigation={this.props.navigation} list={this.props.data} />
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchList: (url: any) => dispatch(fetchList(url))
  };
}

const mapStateToProps = (state: any) => ({
  data: state.library.list,
  isLoading: state.library.isLoading
});
export default connect(mapStateToProps, mapDispatchToProps)(LibraryContainer);
