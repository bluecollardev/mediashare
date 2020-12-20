import * as React from 'react';
import { StyleProvider } from 'native-base';
import { Provider } from 'react-redux';
import { Root } from 'native-base';

import configureStore from './configureStore';
import App from '../../src/App';
import getTheme from '../../src/theme/components';
import variables from '../../src/theme/variables/platform';
export interface Props {}
export interface State {
  store: Object;
  isLoading: boolean;
}
export default class Setup extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      store: configureStore(() => this.setState({ isLoading: false }))
    };
  }

  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={this.state.store}>
          <Root>
            <App />
          </Root>
        </Provider>
      </StyleProvider>
    );
  }
}
