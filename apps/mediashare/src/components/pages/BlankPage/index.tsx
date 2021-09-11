import React from 'react';
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title } from 'native-base';

import styles from '../../../styles';

export interface BlankPageProps {
  navigation: any;
}

export interface BlankPageState {}

class BlankPage extends React.Component<BlankPageProps, BlankPageState> {
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
                // TODO: Fix this!
                // this.props.navigation.openDrawer();
              }}
            >
              <Icon name="search-outline" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>{param ? param.name.item : 'Blank Page'}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}
            >
              <Text>Back</Text>
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Text>{param !== undefined ? param.name.item : 'Create Something Awesome . . .'}</Text>
        </Content>
      </Container>
    );
  }
}

export interface BlankPageProps {
  navigation: any;
}

export interface BlankPageState {}

export default class BlankPageContainer extends React.Component<BlankPageProps, BlankPageState> {
  render() {
    return <BlankPage navigation={this.props.navigation} />;
  }
}
