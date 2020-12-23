import * as React from 'react';
import { connect } from 'react-redux';
import ListPage from '../../screens/ListPage';
import { fetchList } from './actions';
export interface Props {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface State {}
class ListPageContainer extends React.Component<Props, State> {
  componentDidMount() {
    this.props.fetchList();
  }
  render() {
    return (
      <ListPage navigation={this.props.navigation} list={this.props.data} />
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchList: (url: any) => dispatch(fetchList(url)),
  };
}

const mapStateToProps = (state: any) => ({
  data: state.listPage.list,
  isLoading: state.listPage.isLoading,
});
export default connect(mapStateToProps, mapDispatchToProps)(ListPageContainer);
