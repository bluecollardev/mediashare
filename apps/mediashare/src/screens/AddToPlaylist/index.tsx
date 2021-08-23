import * as React from 'react';
import { Button, Container, Content, Icon, List, Text, View } from 'native-base';

import { MediaListItem } from '../../components/layout/MediaListItem';

import { routeConfig } from '../../routes';
import styles from './styles';

export interface AddToPlaylistProps {
  navigation: any;
  list: any;
}

export interface AddToPlaylistState {}

class AddToPlaylist extends React.Component<AddToPlaylistProps, AddToPlaylistState> {
  render() {
    const { navigation } = this.props;
    const imageSrc = 'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

    const items1 = [
      { title: 'Playlist 1', description: '9 Videos', image: imageSrc },
      { title: 'Playlist 2', description: '2 Videos', image: imageSrc },
      { title: 'Playlist 3', description: '3 Videos', image: imageSrc },
      { title: 'Playlist 4', description: '4 Videos', image: imageSrc },
    ];

    return (
      <Container style={styles.container}>
        <Content>
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
                    onViewDetail={() => navigation.navigate(routeConfig.playlistDetail.name)}
                    selectable={false}
                    showActions={false}
                  />
                );
              })}
            </List>
          </View>
          <View padder style={{ flexDirection: 'row' }}>
            <Button
              iconLeft
              bordered
              danger
              style={{
                flex: 1,
                marginRight: 10,
                justifyContent: 'center',
              }}
            >
              <Icon name="close-outline" />
              <Text style={{ paddingRight: 30 }}>Cancel</Text>
            </Button>
            <Button
              iconLeft
              bordered
              success
              style={{
                flex: 1,
                marginRight: 10,
                justifyContent: 'center',
              }}
            >
              <Icon name="add-outline" />
              <Text style={{ paddingRight: 30 }}>Add</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default AddToPlaylist;
