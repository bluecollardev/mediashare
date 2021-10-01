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
