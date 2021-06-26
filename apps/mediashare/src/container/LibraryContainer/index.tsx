import * as React from 'react';
import { connect } from 'react-redux';
import Library from '../../screens/Library';

import { mediaItemsActionTypes } from '../../state/modules/media-items';

export interface LibraryContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface LibraryContainerState {}

class LibraryContainer extends React.Component<LibraryContainerProps, LibraryContainerState> {
  componentDidMount() {
    const { fetchList } = this.props;
    fetchList();
  }
  render() {
    return <Library navigation={this.props.navigation} list={this.props.data} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchList: () => dispatch(),
  };
}

const mapStateToProps = (state: any) => ({
  data: state && state.library ? state.library.list : [],
  isLoading: state && state.library ? state.library.isLoading : false,
});
export default connect(mapStateToProps, mapDispatchToProps)(LibraryContainer);
