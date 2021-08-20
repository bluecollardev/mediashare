import * as React from 'react';
import { connect } from 'react-redux';
import Library from '../../screens/Library';

import { findMediaItems } from '../../state/modules/media-items';

export interface LibraryContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}
export interface LibraryContainerState {}

class LibraryContainer extends React.Component<LibraryContainerProps, LibraryContainerState> {
  componentDidMount() {
    const { fetchList } = this.props;
    fetchList();
  }
  render() {
    const { state } = this.props;
    return <Library navigation={this.props.navigation} list={this.props.data} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchList: () => dispatch(findMediaItems(null)),
  };
}

const mapStateToProps = (state: any) => ({
  state: state,
  data: state?.userMediaItems?.userMediaItems ? state.userMediaItems.userMediaItems : [],
  isLoading: state && state.userMediaItems ? state.userMediaItems.isLoading : false,
});
export default connect(mapStateToProps, mapDispatchToProps)(LibraryContainer);
