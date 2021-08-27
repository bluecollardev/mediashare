import { Container, Content, Text, View } from 'native-base';
import * as React from 'react';
import { LibraryItemCard } from '../../components/layout/LibraryItemCard';
import styles from '../../screens/Home/styles';
import { useAppSelector } from '../../state';

export interface LibraryItemDetailContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface LibraryItemDetailContainerState {}

const LibraryItemDetailContainer = (props) => {
  const onEditClicked = () => {};
  const onDeleteClicked = () => {};
  const mediaItem = useAppSelector((state) => state.mediaItem.mediaItem);
  const mediaItemSrc = useAppSelector((state) => state.mediaItem.mediaSrc);

  return (
    <Container style={styles.container}>
      <View padder>
        <LibraryItemCard
          title={mediaItem.title}
          description={mediaItem.description}
          image={mediaItemSrc}
          showActions={true}
          onEditClicked={onEditClicked}
          onDeleteClicked={onDeleteClicked}
        />
      </View>
    </Container>
  );
};

export default LibraryItemDetailContainer;
