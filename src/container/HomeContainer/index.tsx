import * as React from 'react';
import { connect } from 'react-redux';
import Home from '../../screens/Home';
import { fetchList } from './actions';
import datas from './data';

export interface HomeContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}

export interface HomeContainerState {}

class HomeContainer extends React.Component<
  HomeContainerProps,
  HomeContainerState
> {
  componentDidMount() {
    this.props.fetchList(datas);
  }
  render() {
    return <Home navigation={this.props.navigation} list={this.props.data} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchList: (url: any) => dispatch(fetchList(url)),
  };
}

const mapStateToProps = (state: any) => ({
  data: state.home.list,
  isLoading: state.home.isLoading
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
