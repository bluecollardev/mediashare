import * as React from 'react';
import { Container, Content, View } from 'native-base';

import styles from './styles';
import { AppHeader } from '../../components/layout/AppHeader';
import { PlaylistCard } from '../../components/layout/PlaylistCard';

import MediaDetail, {
  MediaDetailProps,
  MediaDetailState,
} from '../MediaDetail';

export interface PlaylistDetailProps extends MediaDetailProps {
  navigation: any;
  list: any;
}
export interface PlaylistDetailState extends MediaDetailState {}

class PlaylistDetail extends MediaDetail {
  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <AppHeader title="Playlist" navigation={navigation} />
        <Content>
          <View padder>
            <PlaylistCard />
          </View>
        </Content>
      </Container>
    );
  }
}

export default PlaylistDetail;
