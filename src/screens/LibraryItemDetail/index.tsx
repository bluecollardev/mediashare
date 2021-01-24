import * as React from 'react';
import { Container, Content, View } from 'native-base';

import MediaDetail, {
  MediaDetailProps,
  MediaDetailState
} from '../MediaDetail';
import { LibraryItemCard } from '../../components/layout/LibraryItemCard';

export interface LibraryItemDetailProps extends MediaDetailProps {
  navigation: any;
  list: any;
}

export interface LibraryItemDetailState extends MediaDetailState {}

import styles from './styles';
import { PlaylistCard } from '../../components/layout/PlaylistCard';
import { routeConfig } from '../../routes';

class LibraryItemDetail extends MediaDetail<
  LibraryItemDetailProps,
  LibraryItemDetailState
> {
  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { navigation } = this.props;
    const title = 'My Video #1';
    const author = 'Blue Collar Dev';
    const description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
      'eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const image =
      'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

    const onEditClicked = () => {
      navigation.navigate(routeConfig.libraryItemEdit.name);
    };
    const onDeleteClicked = () => {};

    return (
      <Container style={styles.container}>
        <Content>
          <View padder>
            <LibraryItemCard
              title={title}
              author={author}
              description={description}
              image={image}
              onEditClicked={onEditClicked}
              onDeleteClicked={onDeleteClicked}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default LibraryItemDetail;
