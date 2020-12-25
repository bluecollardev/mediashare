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
import { MediaCard } from '../../components/layout/MediaCard';

export interface ExploreProps {
  navigation: any;
  list: any;
}
export interface ExploreState {}

class Explore extends React.Component<ExploreProps, ExploreState> {
  render() {
    const { navigation } = this.props;
    const imageSrc =
      'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

    const items1 = [
      { title: 'Playlist 1', description: '9 Videos', image: imageSrc },
      { title: 'Playlist 2', description: '2 Videos', image: imageSrc }
    ];
    const items2 = [
      { title: 'Playlist 3', description: '3 Videos', image: imageSrc },
      { title: 'Playlist 4', description: '6 Videos', image: imageSrc }
    ];

    return (
      <Container style={styles.container}>
        <AppHeader
          title="Explore"
          navigation={navigation}
          showSearch={true}
          showSort={true}
        />
        <Content>
          {/* <View padder>
            <MediaCard />
          </View> */}
          {/*<Accordion dataArray={dataArray} expanded={0} />*/}
          <View>
            <List>
              <ListItemGroup key={'group1'} text={'Playlists by Bob Johnson'} />
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
              <ListItemGroup key={'group2'} text={'Playlists by Jane Doe'} />
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
        </Content>
      </Container>
    );
  }
}

export default Explore;
