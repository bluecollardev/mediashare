import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Container, View } from 'native-base';

import { useAppSelector } from '../../../state';
import { getMediaItemById } from '../../../state/modules/media-items';

import { MediaItemCard } from '../../layout/MediaItemCard';

import styles from '../../../styles';
import { useRouteWithParams } from '../../../hooks/NavigationHooks';
import { ROUTES } from '../../../routes';

export interface MediaItemDetailContainerProps {
  navigation: any;
  route: any;
  data: Object;
  state: Object;
  mediaId: string | number; // TODO: Make a type
}

export interface MediaItemDetailContainerState {}

const MediaItemDetailContainer = ({ route }) => {
  const dispatch = useDispatch();

  const onEditClicked = useRouteWithParams(ROUTES.mediaItemEdit);

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
          <MediaItemCard
            author=""
            title=""
            description=""
            showActions={false}
            category=""
            onEditClicked={() => onEditClicked({ mediaId })}
            onDeleteClicked={onDeleteClicked}
          />
        </View>
      </Container>
    );
  }
  const { title, description, category, author } = mediaItem || {};

  return (
    <Container style={styles.container}>
      <View padder>
        <MediaItemCard
          title={title}
          description={description}
          image={mediaItemSrc}
          showActions={true}
          category={category}
          onEditClicked={() => onEditClicked({ mediaId })}
          onDeleteClicked={onDeleteClicked}
          author={author}
        />
      </View>
    </Container>
  );
};

export default MediaItemDetailContainer;
