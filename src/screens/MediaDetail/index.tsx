import * as React from 'react';
import {
  Container,
  Content,
  View
} from 'native-base';

import styles from './styles';
import { AppHeader } from '../../components/layout/AppHeader';
import { MediaCard } from '../../components/layout/MediaCard';

export interface MediaDetailProps {
  navigation: any;
  list: any;
}
export interface MediaDetailState {}

const dataArray = [
  { title: 'First Element', content: 'Lorem ipsum dolor sit amet' },
  { title: 'Second Element', content: 'Lorem ipsum dolor sit amet' },
  { title: 'Third Element', content: 'Lorem ipsum dolor sit amet' }
];

class MediaDetail extends React.Component<MediaDetailProps, MediaDetailState> {
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

export default MediaDetail;
