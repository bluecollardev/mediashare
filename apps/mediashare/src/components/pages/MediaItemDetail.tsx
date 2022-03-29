import React from 'react';
import { ScrollView } from 'react-native';
import { withGlobalStateConsumer } from 'mediashare/core/globalState/index';
import { useAppSelector } from 'mediashare/store';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { PageContainer, PageContent, PageProps } from '../layout/PageContainer';
import { MediaCard } from '../layout/mediaCard';

// @ts-ignore
const MediaItemDetail = ({ globalState = { tags: [] } }: PageProps) => {
  const mediaItem = useAppSelector((state) => state.mediaItem?.entity);
  const { title, description, category, author, uri, thumbnail } = mediaItem || {};

  const tagKeys = (mediaItem?.tags || []).map((tag) => tag.key);
  const { tags = [] } = globalState;

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
            availableTags={tags}
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

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(MediaItemDetail));
