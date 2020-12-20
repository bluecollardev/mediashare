import * as React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
} from 'native-base';

import styles from './styles';
export interface Props {
  navigation: any;
  list: any;
}
export interface State {}
class Home extends React.Component<Props, State> {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.openDrawer();
              }}>
              <Text>Menu</Text>
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content />
      </Container>
    );
  }
}

export default Home;
