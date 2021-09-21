import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { getMediaItemById } from '../../state/modules/media-items';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { PageContainer, PageContent, PageProps } from '../layout/PageContainer';
import { MediaItemCard } from '../layout/MediaItemCard';
import { Spinner } from 'native-base';

const MediaItemDetail = ({ route, onDataLoaded }: PageProps) => {
  const dispatch = useDispatch();

  const { mediaId } = route?.params || {};
  const { mediaItem, loading, loaded } = useAppSelector((state) => state.mediaItem);

  const [isLoaded, setIsLoaded] = useState(loaded);

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
  }, [dispatch, isLoaded, mediaId, _id]);

  const { title, description, category, author, uri, thumbnail } = mediaItem || {};
  console.log(mediaItem);
  // if (!mediaItem) {
  //   return <Spinner />;
  // }
  return (
    <PageContainer>
      <PageContent>
        <MediaItemCard title={title} description={description} image={thumbnail} showActions={false} category={category} author={author} mediaSrc={uri} />
      </PageContent>
    </PageContainer>
  );
};

export default withLoadingSpinner(MediaItemDetail);
