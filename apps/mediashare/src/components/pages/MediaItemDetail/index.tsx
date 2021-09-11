import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Container, View } from 'native-base';

import { useAppSelector } from '../../../state';
import { getMediaItemById } from '../../../state/modules/media-items';

import { MediaItemCard } from '../../layout/MediaItemCard';

import styles from '../../../styles';
import { useRouteWithParams } from '../../../hooks/NavigationHooks';
import { ROUTES } from '../../../routes';
import { useSpinner } from '../../../hooks/useSpinner';
import PageContainer from '../../layout/PageContainer';

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
    async function loadData() {
      dispatch(getMediaItemById({ uri, mediaId }));

      setIsLoaded(true);
    }
    if (!isLoaded || _id !== mediaId) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoaded, uri, mediaId, _id]);

  const { title, description, category, author } = mediaItem || {};

  return (
    <PageContainer>
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
    </PageContainer>
  );
};

export default MediaItemDetailContainer;
