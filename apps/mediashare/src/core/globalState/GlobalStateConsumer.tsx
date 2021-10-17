import React from 'react';
import { GlobalState } from './index';

// eslint-disable-next-line react/display-name
export const GlobalStateConsumer = (WrappedComponent: any) => (props) => (
  <GlobalState.Consumer>{(globalState) => <WrappedComponent {...props} globalState={globalState} />}</GlobalState.Consumer>
);
