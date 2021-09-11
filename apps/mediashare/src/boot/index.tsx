import * as React from 'react';
// import { StyleProvider } from 'native-base';
// import getTheme from '../../src/theme/components';
// import variables from '../../src/theme/variables/platform';
import { Provider } from 'react-redux';
import { Root } from 'native-base';

import { store } from './configureStore';
import App from '../../src/App';

export interface SetupProps {}

export interface SetupState {
  isLoading: boolean;
}

const onCompletion = () => {};
// export const store = configureStore(onCompletion);

export default class Setup extends React.Component<SetupProps, SetupState> {
  constructor(props) {
    super(props);
  }

  render() {
    /*
    <StyleProvider style={getTheme(variables)}>
      <Provider store={this.state.store}>
        <Root>
          <App />
        </Root>
      </Provider>
    </StyleProvider>
    */
    return (
      <Provider store={store}>
        <Root>
          <App />
        </Root>
      </Provider>
    );
  }
}
