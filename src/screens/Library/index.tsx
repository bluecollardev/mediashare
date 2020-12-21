import * as React from 'react';
import {
  Container,
  Content,
  View,
  Text,
  Button,
  Icon,
  Left,
  Right,
  List,
  ListItem
} from 'native-base';

import { MediaListItem } from '../../components/layout/MediaListItem';

import styles from './styles';
import { AppHeader } from '../../components/layout/AppHeader';

export interface LibraryProps {
  navigation: any;
  list: any;
}
export interface LibraryState {}

class Library extends React.Component<LibraryProps, LibraryState> {
  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <AppHeader title="Library" navigation={navigation} />
        <Content>
          <View padder style={{ flexDirection: 'row' }}>
            <Button iconLeft bordered dark style={{ flex: 1, marginRight: 10 }}>
              <Icon name="add-outline" />
              <Text style={{ paddingRight: 30 }}>Add From Feed</Text>
            </Button>
            <Button iconLeft bordered dark style={{ flex: 1 }}>
              <Icon name="add-outline" />
              <Text style={{ paddingRight: 30 }}>Add to Playlist </Text>
            </Button>
          </View>
          <List>
            <ListItem itemDivider>
              <Left style={{ width: '85%', flex: 0 }}>
                <Text>Group 1</Text>
              </Left>
              <Right style={{ width: '15%', flex: 1 }}>
                <Button transparent>
                  <Icon name="chevron-forward-outline" />
                </Button>
              </Right>
            </ListItem>
            <MediaListItem />
            <MediaListItem />
            <ListItem itemDivider>
              <Text>Group 2</Text>
            </ListItem>
            <MediaListItem />
            <MediaListItem />
          </List>
        </Content>
      </Container>
    );
  }
}

export default Library;
