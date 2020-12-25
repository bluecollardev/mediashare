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
  Body,
} from 'native-base';

import styles from './styles';
import { ContactList } from '../../components/layout/ContactList';
import AccountForm from '../../components/layout/AccountForm';

export interface SettingsProps {
  navigation: any;
}
export interface SettingsState {}
class Settings extends React.Component<SettingsProps, SettingsState> {
  sections = [
    {
      title: 'My Account',
      content: (
        <View padder>
          <AccountForm />
        </View>
      )
    },
    {
      title: 'Manage Clients',
      content: (
        <View padder>
          <ContactList />
        </View>
      )
    },
    {
      title: 'Manage Groups',
      content: (
        <View padder>
          <ContactList />
        </View>
      )
    },
  ];

  renderHeader(item: any, expanded: boolean) {
    return (
      <View padder style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text>{item.title}</Text>
        {expanded ? (
          <Icon name="caret-up-outline" />
        ) : (
          <Icon name="caret-down-outline" />
        )}
      </View>
    );
  }
  renderContent(item: any) {
    return <Text>{item.content}</Text>;
  }

  // <Icon name="ios-arrow-back" />
  render() {
    const param = this.props.navigation.state.params;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.openDrawer();
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
          <View>
            <Accordion
              dataArray={this.sections}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default Settings;
