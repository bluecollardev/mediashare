import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { getMediaItemById } from '../../state/modules/media-items';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { PageContainer, PageContent, PageProps } from '../layout/PageContainer';
import { MediaItemCard } from '../layout/MediaItemCard';

const MediaItemDetail = ({ route, onDataLoaded }: PageProps) => {
  const dispatch = useDispatch();

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
      <PageContent>
        <MediaItemCard
          title={title}
          description={description}
          image={mediaItemSrc}
          showActions={false}
          category={category}
          author={author}
        />
      </PageContent>
    </PageContainer>
  );
};

export default withLoadingSpinner(MediaItemDetail);
