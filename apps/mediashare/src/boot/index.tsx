// This resolves an error which occurs in environments where the standard crypto.getRandomValues() API is not supported.
// This issue can be resolved by adding the react-native-get-random-values polyfill. We also do this in utils, but
// adding this here ensures that the polyfill will get loaded before any crypto.getRandomValues() calls:
import 'react-native-get-random-values';
import * as React from 'react';
import { Provider } from 'react-redux';

import { store } from './configureStore';
import App from '../../src/App';

export interface SetupProps {}

export interface SetupState {
  isLoading: boolean;
}

export default class Setup extends React.Component<SetupProps, SetupState> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
