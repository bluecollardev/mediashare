import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { View } from 'react-native';

import { useAppSelector } from '../../state';
import { getMediaItemById } from '../../state/modules/media-items';

import { ExploreItemCard } from '../layout/ExploreItemCard';
import { PageContainer, PageContent, PageProps } from '../layout/PageContainer';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

const ExploreItemDetail = ({ route }: PageProps) => {
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
      <PageContainer>
        <View>
          <ExploreItemCard title="" description="" showActions={false} category="" onEditClicked={onEditClicked} onDeleteClicked={onDeleteClicked} author="" />
        </View>
      </PageContainer>
    );
  }
  const { title, description, category, author } = mediaItem || {};

  return (
    <PageContainer>
      <PageContent>
        <ExploreItemCard
          title={title}
          description={description}
          image={mediaItemSrc}
          showActions={false}
          category={category}
          onEditClicked={onEditClicked}
          onDeleteClicked={onDeleteClicked}
          author={author}
        />
      </PageContent>
    </PageContainer>
  );
};

export default withLoadingSpinner(ExploreItemDetail);
