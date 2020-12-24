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
import { ListItemGroup } from '../../components/layout/ListItemGroup';

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
          <View>
            <List>
              <ListItemGroup key={'group1'} text={'Group 1'} />
              <MediaListItem key={'item1'} />
              <MediaListItem key={'item2'} />
              <ListItemGroup key={'group2'} text={'Group 2'} />
              <MediaListItem key={'item3'} />
              <MediaListItem key={'item4'} />
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Library;
