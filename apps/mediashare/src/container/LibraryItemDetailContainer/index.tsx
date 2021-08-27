import { Container, View } from 'native-base';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LibraryItemCard } from '../../components/layout/LibraryItemCard';
import styles from '../../screens/Home/styles';
import { useAppSelector } from '../../state';
import { getMediaItemById } from '../../state/modules/media-items/index';

export interface LibraryItemDetailContainerProps {
  navigation: any;
  data: Object;
}
export interface LibraryItemDetailContainerState {}

const LibraryItemDetailContainer = ({ route }) => {
  const dispatch = useDispatch();

  const onEditClicked = () => {};
  const onDeleteClicked = () => {};

  const { mediaId, uri } = route?.params || {};
  const { mediaItem, loading, loaded } = useAppSelector((state) => state.mediaItem);

  const [isLoaded, setIsLoaded] = useState(loaded);
  const mediaItemSrc = useAppSelector((state) => state.mediaItem.mediaSrc);
  const { _id } = mediaItem || {};
  useEffect(() => {
    if (!isLoaded || _id !== mediaId) {
      dispatch(getMediaItemById({ uri, mediaId }));

      setIsLoaded(true);
    }
  }, [dispatch, isLoaded, uri, mediaId, _id]);

  if (!isLoaded && !mediaItem) {
    return (
      <Container style={styles.container}>
        <View padder>
          <LibraryItemCard title="" description="" showActions={false} category="" onEditClicked={onEditClicked} onDeleteClicked={onDeleteClicked} author="" />
        </View>
      </Container>
    );
  }
  const { title, description, category, author } = mediaItem || {};

  return (
    <Container style={styles.container}>
      <View padder>
        <LibraryItemCard
          title={title}
          description={description}
          image={mediaItemSrc}
          showActions={true}
          category={category}
          onEditClicked={onEditClicked}
          onDeleteClicked={onDeleteClicked}
          author={author}
        />
      </View>
    </Container>
  );
};

export default LibraryItemDetailContainer;
