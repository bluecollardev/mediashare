import * as React from 'react';
import { connect } from 'react-redux';
import Explore from '../../screens/Explore';
import datas from './data';
import { fetchList } from './actions';
export interface ExploreContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface ExploreContainerState {}
class ExploreContainer extends React.Component<
  ExploreContainerProps,
  ExploreContainerState
> {
  componentDidMount() {
    this.props.fetchList(datas);
  }
  render() {
    return (
      <Explore navigation={this.props.navigation} list={this.props.data} />
    );
  }
}

function bindAction(dispatch: any) {
  return {
    fetchList: (url: any) => dispatch(fetchList(url))
  };
}

const mapStateToProps = (state: any) => ({
  data: state.ExploreReducer.list,
  isLoading: state.ExploreReducer.isLoading,
});
export default connect(mapStateToProps, bindAction)(ExploreContainer);
