import React from 'react';
import { ScrollView } from 'react-native-paper';
import { useAppSelector } from '../../store';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { PageContainer, PageContent, PageProps } from '../layout/PageContainer';
import { MediaCard } from '../layout/MediaCard';

const MediaItemDetail = ({}: PageProps) => {
  const mediaItem = useAppSelector((state) => state.mediaItem?.entity);
  const { title, description, category, author, uri, thumbnail } = mediaItem || {};

  const tagKeys = (mediaItem?.tags || []).map((tag) => tag.key);

  return (
    <PageContainer>
      <PageContent>
        <ScrollView>
          <MediaCard
            title={title}
            author={author}
            description={description}
            mediaSrc={uri}
            thumbnail={thumbnail}
            showThumbnail={true}
            category={category}
            tags={tagKeys}
            showSocial={true}
            showActions={false}
            isPlayable={true}
            // likes={likesCount}
            // shares={shareCount}
            // views={viewCount}
          />
        </ScrollView>
      </PageContent>
    </PageContainer>
  );
};

export default withLoadingSpinner(MediaItemDetail);
