import * as React from 'react';
import { connect } from 'react-redux';
import ListPage from '../../screens/ListPage';
import datas from './data';
import { fetchList } from './actions';
export interface Props {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface State {}
class ListPageContainer extends React.Component<Props, State> {
  componentDidMount() {
    this.props.fetchList(datas);
  }
  render() {
    return (
      <ListPage navigation={this.props.navigation} list={this.props.data} />
    );
  }
}

function bindAction(dispatch: any) {
  return {
    fetchList: (url: any) => dispatch(fetchList(url)),
  };
}

const mapStateToProps = (state: any) => ({
  data: state.ExploreReducer.list,
  isLoading: state.ExploreReducer.isLoading,
});
export default connect(mapStateToProps, bindAction)(ListPageContainer);
