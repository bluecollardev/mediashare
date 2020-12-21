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
          <List>
            <ListItem itemDivider>
              <Left style={{ width: '85%', flex: 0 }}>
                <Text>Category 1</Text>
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
              <Text>Category 2</Text>
            </ListItem>
            <MediaListItem />
            <MediaListItem />
          </List>
        </Content>
      </Container>
    );
  }
}

export default Explore;
