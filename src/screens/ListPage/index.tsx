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
  View
} from 'native-base';

import styles from './styles';
export interface ListPageProps {
  navigation: any;
  list: any;
}
export interface ListPageState {}
class ListPage extends React.Component<ListPageProps, ListPageState> {
  render() {
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
          <Body>
            <Title>List Page</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View>
            <List>
              {this.props.list.map((item, i) => (
                <ListItem
                  key={`item-${i}`}
                  onPress={() =>
                    this.props.navigation.navigate('Blank Page', {
                      name: { item }
                    })
                  }>
                  <Text>{item}</Text>
                </ListItem>
              ))}
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ListPage;
