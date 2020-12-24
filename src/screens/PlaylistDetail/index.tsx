import * as React from 'react';
import { Container, Content, List, View } from 'native-base';

import styles from './styles';
import { AppHeader } from '../../components/layout/AppHeader';
import { PlaylistCard } from '../../components/layout/PlaylistCard';

import MediaDetail, {
  MediaDetailProps,
  MediaDetailState
} from '../MediaDetail';
import { MediaListItem } from '../../components/layout/MediaListItem';

export interface PlaylistDetailProps extends MediaDetailProps {
  navigation: any;
  list: any;
}
export interface PlaylistDetailState extends MediaDetailState {}

class PlaylistDetail extends MediaDetail<
  PlaylistDetailProps,
  PlaylistDetailState
> {
  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <AppHeader title="Playlist" navigation={navigation} />
        <Content>
          <View padder>
            <PlaylistCard />
          </View>
          <View>
            <List>
              <MediaListItem key={'item1'} />
              <MediaListItem key={'item2'} />
              <MediaListItem key={'item3'} />
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}

export default PlaylistDetail;
