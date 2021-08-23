import { connect, Provider } from 'react-redux';
import { RootState } from './state';
import React from 'react';
import { store } from './state/store';
const AppProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

function mapDispatchToProps(dispatch: any) {
  return {};
}

const mapStateToProps = (state: RootState) => ({
  ...state,
});

export default connect(mapStateToProps)(AppProvider);
