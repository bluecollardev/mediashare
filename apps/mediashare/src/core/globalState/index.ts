import React from 'react';
import { compose } from 'recompose';
import { GlobalStateConsumer } from './GlobalStateConsumer';

import { GlobalStateProvider } from './GlobalStateProvider';

export interface GlobalStateProviderProps {
  loading?: boolean;
  isLoggedIn?: boolean;
  // eg.
  // history: any;
  // location: any;
}

export const GlobalState = React.createContext<GlobalStateProviderProps>({} as GlobalStateProviderProps);

// eg. compose(withRouter, GlobalStateProvider)
const withGlobalStateProvider = compose(GlobalStateProvider);
const withGlobalStateConsumer = GlobalStateConsumer;

export { withGlobalStateProvider, withGlobalStateConsumer };
