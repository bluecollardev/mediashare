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
    return (
      <Container style={styles.container}>
        <AppHeader title="Explore" navigation={navigation} />
        <Content>
          <View padder>
            <MediaCard />
          </View>
          {/*<Accordion dataArray={dataArray} expanded={0} />*/}
          <View>
            <List>
              <ListItemGroup key={'group1'} text={'Category 1'} />
              <MediaListItem key={'item1'} />
              <MediaListItem key={'item2'} />
              <ListItemGroup key={'group2'} text={'Category 2'} />
              <MediaListItem key={'item3'} />
              <MediaListItem key={'item4'} />
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Explore;
