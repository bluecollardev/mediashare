import * as React from 'react';
import { Container, Content, View } from 'native-base';

import styles from './styles';
import { AppHeader } from '../../components/layout/AppHeader';
import { LibraryItemCard } from '../../components/layout/LibraryItemCard';

import MediaDetail, {
  MediaDetailProps,
  MediaDetailState
} from '../MediaDetail';

export interface LibraryItemDetailProps extends MediaDetailProps {
  navigation: any;
  list: any;
}
export interface LibraryItemDetailState extends MediaDetailState {}

class LibraryItemDetail extends MediaDetail<
  LibraryItemDetailProps,
  LibraryItemDetailState
> {
  render() {
    const { navigation } = this.props;
    const title = 'My Video #1';
    const author = 'Blue Collar Dev';
    const description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
      'eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const image =
      'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

    return (
      <Container style={styles.container}>
        <AppHeader
          title="Preview Item"
          navigation={navigation}
          showBack={true}
        />
        <Content>
          <View padder>
            <LibraryItemCard
              title={title}
              author={author}
              description={description}
              image={image}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default LibraryItemDetail;
