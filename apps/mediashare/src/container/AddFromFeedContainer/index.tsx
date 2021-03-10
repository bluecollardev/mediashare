import * as React from 'react';
import { connect } from 'react-redux';
import AddFromFeed from '../../screens/AddFrom';

export interface AddFromFeedContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface AddFromFeedContainerState {}

class AddFromFeedContainer extends React.Component<AddFromFeedContainerProps, AddFromFeedContainerState> {
  componentDidMount() {
    this.props.fetchList();
  }
  render() {
    return <AddFromFeed navigation={this.props.navigation} list={this.props.data} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    // fetchList: (url: any) => dispatch(fetchList(url)),
  };
}

const mapStateToProps = (state: any) => ({
  data: state.playlistDetail.list,
  isLoading: state.playlistDetail.isLoading,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddFromFeedContainer);
