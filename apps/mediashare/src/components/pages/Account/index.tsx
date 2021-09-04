import React from 'react';
import { connect } from 'react-redux';
import { AccountForm as Account } from '../../layout/AccountForm';

export interface AccountContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface AccountContainerState {}

class AccountContainer extends React.Component<AccountContainerProps, AccountContainerState> {
  componentDidMount() {
    // this.props.fetchList();
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
  data: state && state.playlists ? state.playlists.list : [],
  isLoading: state && state.playlists ? state.playlists.isLoading : false,
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
