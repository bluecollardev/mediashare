import * as React from 'react';
import { Container, View, Header, Title, Content, Accordion, Text, Button, Icon, Left, Right, Body } from 'native-base';
import { ContactList } from '../../components/layout/ContactList';
import { Auth } from 'aws-amplify';
import styles from './styles';

export interface SettingsProps {
  navigation: any;
}

export interface SettingsState {}

class Settings extends React.Component<SettingsProps, SettingsState> {
  sections = [];

  signOut() {
    Auth.signOut();
  }

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
          <Button onPress={this.signOut} style={{ alignSelf: 'center' }} transparent>
            <Text>SignOut</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Settings;
