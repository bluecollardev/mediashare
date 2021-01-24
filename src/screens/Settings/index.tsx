import * as React from 'react';
import {
  Container,
  View,
  Header,
  Title,
  Content,
  Accordion,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body
} from 'native-base';

import styles from './styles';
import { ContactList } from '../../components/layout/ContactList';
import Account from '../../container/AccountContainer';

export interface SettingsProps {
  navigation: any;
}
export interface SettingsState {}

class Settings extends React.Component<SettingsProps, SettingsState> {
  sections = [];

  constructor(props: SettingsProps) {
    super(props);

    this.sections = [
      {
        title: 'My Account',
        content: (props: SettingsProps) => (
          <Account navigation={props.navigation} />
        )
      },
      {
        title: 'Manage Clients',
        content: () => <ContactList />
      },
      {
        title: 'Manage Groups',
        content: () => <ContactList />
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
        }}>
        <Text>{item.title}</Text>
        {expanded ? (
          <Icon name="caret-up-outline" />
        ) : (
          <Icon name="caret-down-outline" />
        )}
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
        item: 'Settings'
      }
    }; // this.props.navigation.state.params;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                // TODO: Fix this!
                // this.props.navigation.openDrawer();
              }}>
              <Icon name="search-outline" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>{param ? param.name.item : 'Settings'}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}>
              <Text>Back</Text>
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Accordion
            dataArray={this.sections}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
          />
        </Content>
      </Container>
    );
  }
}

export default Settings;
