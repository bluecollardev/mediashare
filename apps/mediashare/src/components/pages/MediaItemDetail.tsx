import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { mapAvailableTags } from 'mediashare/store/modules/tags';
import { useAppSelector } from 'mediashare/store';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { PageContainer, PageContent, PageProps, MediaCard } from 'mediashare/components/layout';

// @ts-ignore
const MediaItemDetail = ({ globalState = { tags: [] } }: PageProps) => {
  const mediaItem = useAppSelector((state) => state?.mediaItem?.entity);
  const { _id, title, description, category, author, uri, thumbnail } = mediaItem || {};

  const { tags = [] } = globalState;
  const tagKeys = (mediaItem?.tags || []).map(({ key }) => key);
  const mappedTags = useMemo(() => mapAvailableTags(tags).filter((tag) => tag.isMediaTag), []);

  return (
    <PageContainer>
      <PageContent>
        <ScrollView>
          <MediaCard
            key={_id}
            title={title}
            author={author}
            description={description}
            mediaSrc={uri}
            thumbnail={thumbnail}
            showThumbnail={true}
            category={category}
            availableTags={mappedTags}
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
