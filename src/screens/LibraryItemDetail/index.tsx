import * as React from 'react';
import { Container, Content, View } from 'native-base';

import styles from './styles';
import { AppHeader } from '../../components/layout/AppHeader';
import { LibraryItemCard } from '../../components/layout/LibraryItemCard';

import MediaDetail, {
  MediaDetailProps,
  MediaDetailState,
} from '../MediaDetail';

export interface LibraryItemDetailProps extends MediaDetailProps {
  navigation: any;
  list: any;
}
export interface LibraryItemDetailState extends MediaDetailState {}

class LibraryItemDetail extends MediaDetail {
  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <AppHeader title="Library Item" navigation={navigation} />
        <Content>
          <View padder>
            <LibraryItemCard />
          </View>
        </Content>
      </Container>
    );
  }
}

export default LibraryItemDetail;
