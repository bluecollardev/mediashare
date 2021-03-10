import * as React from 'react';
import BlankPage from '../../screens/BlankPage';

export interface BlankPageProps {
  navigation: any;
}
export interface BlankPageState {}

export default class BlankPageContainer extends React.Component<BlankPageProps, BlankPageState> {
  render() {
    return <BlankPage navigation={this.props.navigation} />;
  }
}
