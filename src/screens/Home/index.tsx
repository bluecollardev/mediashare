import * as React from 'react';
import {
  Container,
  Content,
  View,
  Text,
  Button,
  Icon
} from 'native-base';

import { MediaListItem } from '../../components/layout/MediaListItem';

import styles from './styles';
import { AppHeader } from '../../components/layout/AppHeader';
import { MediaCard } from '../../components/layout/MediaCard';

export interface HomeProps {
  navigation: any;
  list: any;
}
export interface HomeState {}

const dataArray = [
  { title: 'First Element', content: 'Lorem ipsum dolor sit amet' },
  { title: 'Second Element', content: 'Lorem ipsum dolor sit amet' },
  { title: 'Third Element', content: 'Lorem ipsum dolor sit amet' }
];

class Home extends React.Component<HomeProps, HomeState> {
  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <AppHeader title="Home" navigation={navigation} />
        <Content>
          <View padder>
            <MediaCard />
          </View>
        </Content>
      </Container>
    );
  }
}

export default Home;
