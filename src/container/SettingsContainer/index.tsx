import * as React from 'react';
import Settings from '../../screens/Settings';
export interface Props {
  navigation: any;
}
export interface State {}
export default class SettingsContainer extends React.Component<Props, State> {
  render() {
    return <Settings navigation={this.props.navigation} />;
  }
}
