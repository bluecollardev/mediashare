import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { getMediaItemById } from '../../state/modules/media-items';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { PageContainer, PageContent, PageProps } from '../layout/PageContainer';
import { MediaCard } from '../layout/MediaCard';

const MediaItemDetail = ({}: PageProps) => {
  const mediaItem = useAppSelector((state) => state.mediaItem.mediaItem);

  const { title, description, category, author, uri, thumbnail } = mediaItem || {};

  return (
    <PageContainer>
      <PageContent>
        <MediaCard
          title={title}
          author={author}
          description={description}
          mediaSrc={uri}
          thumbnail={thumbnail}
          showThumbnail={true}
          category={category}
          showSocial={true}
          showActions={false}
          isPlayable={true}
          // likes={likesCount}
          // shares={shareCount}
          // views={viewCount}
        />
      </PageContent>
    </PageContainer>
  );
};

export default withLoadingSpinner(MediaItemDetail);
