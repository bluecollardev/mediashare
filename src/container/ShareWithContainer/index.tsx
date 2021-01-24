import * as React from 'react';
import { connect } from 'react-redux';
import ShareWith from '../../screens/ShareWith';
import { fetchList } from './actions';

export interface ShareWithContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface ShareWithContainerState {}

class ShareWithContainer extends React.Component<
  ShareWithContainerProps,
  ShareWithContainerState
> {
  componentDidMount() {
    this.props.fetchList();
  }
  render() {
    return (
      <ShareWith navigation={this.props.navigation} list={this.props.data} />
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
)(ShareWithContainer);
