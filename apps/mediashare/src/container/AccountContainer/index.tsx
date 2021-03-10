import * as React from 'react';
import { connect } from 'react-redux';
import { AccountForm as Account } from '../../components/layout/AccountForm';

export interface AccountContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface AccountContainerState {}

class AccountContainer extends React.Component<AccountContainerProps, AccountContainerState> {
  componentDidMount() {
    this.props.fetchList();
  }
  render() {
    return <Account navigation={this.props.navigation} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    // fetchList: (url: any) => dispatch(fetchList(url)),
  };
}

const mapStateToProps = (state: any) => ({
  data: state.playlists.list,
  isLoading: state.playlists.isLoading,
});
export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
