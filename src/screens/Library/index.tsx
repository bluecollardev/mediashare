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
    const descriptionText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
      'eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const imageSrc =
      'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

    const items1 = [
      { title: 'Video 1', description: descriptionText, image: imageSrc },
      { title: 'Video 2', description: descriptionText, image: imageSrc }
    ];
    const items2 = [
      { title: 'Video 3', description: descriptionText, image: imageSrc },
      { title: 'Video 4', description: descriptionText, image: imageSrc }
    ];

    return (
      <Container style={styles.container}>
        <AppHeader
          title="Library"
          navigation={navigation}
          showSearch={true}
          showSort={true}
        />
        <Content>
          <View padder style={{ flexDirection: 'row' }}>
            <Button iconLeft bordered dark style={{ flex: 1, marginRight: 10 }}>
              <Icon name="add-outline" />
              <Text style={{ paddingRight: 30 }}>Add From Feed</Text>
            </Button>
            <Button iconLeft bordered dark style={{ flex: 1 }}>
              <Icon name="add-outline" />
              <Text style={{ paddingRight: 30 }}>Add to Playlist</Text>
            </Button>
          </View>
          <View>
            <List>
              {/* <ListItemGroup key={'group1'} text={'Group 1'} /> */}
              {items1.map((item, idx) => {
                const { title, description, image } = item;
                return (
                  <MediaListItem
                    key={`item-${idx}`}
                    title={title}
                    description={description}
                    image={image}
                  />
                );
              })}
              {/* <ListItemGroup key={'group2'} text={'Group 2'} /> */}
              {items2.map((item, idx) => {
                const { title, description, image } = item;
                return (
                  <MediaListItem
                    key={`item-${idx}`}
                    title={title}
                    description={description}
                    image={image}
                  />
                );
              })}
            </List>
          </View>
          <View padder style={{ flexDirection: 'row' }}>
            <Button
              iconLeft
              bordered
              dark
              style={{ flex: 1, justifyContent: 'center' }}>
              <Icon name="add-outline" />
              <Text style={{ paddingRight: 30 }}>Add to Playlist</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Library;
