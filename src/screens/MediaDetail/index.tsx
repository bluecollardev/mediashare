import * as React from 'react';
import { Container, Content, View } from 'native-base';

import { MediaCard } from '../../components/layout/MediaCard';

import styles from './styles';

export interface MediaDetailProps {
  navigation: any;
  list: any;
}
export interface MediaDetailState {}

class MediaDetail<P, S> extends React.Component<
  MediaDetailProps & P,
  MediaDetailState & S
> {
  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
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
