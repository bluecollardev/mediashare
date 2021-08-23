import * as React from 'react';
import Settings from '../../screens/Settings';

export interface SettingsProps {
  navigation: any;
}

export interface SettingsState {}

export default class SettingsContainer extends React.Component<SettingsProps, SettingsState> {
  render() {
    return <Settings navigation={this.props.navigation} />;
  }
}
