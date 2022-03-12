import React from 'react';
import { useAppSelector } from '../../store';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { PageContainer, PageContent, PageProps } from '../layout/PageContainer';
import { MediaCard } from '../layout/MediaCard';

const MediaItemDetail = ({}: PageProps) => {
  const mediaItem = useAppSelector((state) => state.mediaItem?.entity);
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
