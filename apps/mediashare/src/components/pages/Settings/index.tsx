import React from 'react';
import { Accordion, Container, Content, Icon, Text, View } from 'native-base';

import { ContactList } from '../../layout/ContactList';

import styles from '../../../styles';

export interface SettingsProps {
  navigation: any;
}

export interface SettingsState {}

export class Settings extends React.Component<SettingsProps, SettingsState> {
  sections = [];

  constructor(props: SettingsProps) {
    super(props);

    this.sections = [
      {
        title: 'My Account',
        // content: (props: SettingsProps) => <Account navigation={props.navigation} />,
      },
      {
        title: 'Manage Clients',
        content: () => <ContactList />,
      },
      {
        title: 'Manage Groups',
        content: () => <ContactList />,
      },
    ];
  }

  renderHeader = (item: any, expanded: boolean) => {
    return (
      <View
        padder
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text>{item.title}</Text>
        {expanded ? <Icon name="caret-up-outline" /> : <Icon name="caret-down-outline" />}
      </View>
    );
  };

  renderContent = (item: any) => {
    const { props } = this;
    return <View padder>{item.content(props)}</View>;
  };

  // <Icon name="ios-arrow-back" />
  render() {
    // TODO: Fix this!
    const param = {
      name: {
        item: 'Settings',
      },
    }; // this.props.navigation.state.params;
    return (
      <Container style={styles.container}>
        <Content padder>
          <Accordion dataArray={this.sections} renderHeader={this.renderHeader} renderContent={this.renderContent} />
        </Content>
      </Container>
    );
  }
}

export interface SettingsProps {
  navigation: any;
}

export interface SettingsState {}

export default class SettingsContainer extends React.Component<
  SettingsProps,
  SettingsState
> {
  render() {
    return <Settings navigation={this.props.navigation} />;
  }
}
