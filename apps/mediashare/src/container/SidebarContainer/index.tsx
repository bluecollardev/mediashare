import * as React from 'react';
import Sidebar from '../../screens/Sidebar';

export interface SidebarContainerProps {
  navigation: any;
}
export interface SidebarContainerState {}

export default class SidebarContainer extends React.Component<
  SidebarContainerProps,
  SidebarContainerState
> {
  render() {
    return <Sidebar navigation={this.props.navigation} />;
  }
}
