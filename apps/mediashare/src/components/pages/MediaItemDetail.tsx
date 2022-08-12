import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { mapAvailableTags } from 'mediashare/store/modules/tags';
import { useAppSelector } from 'mediashare/store';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { PageContainer, PageContent, PageProps, MediaCard } from 'mediashare/components/layout';
import { AuthorProfileDto } from 'mediashare/rxjs-api';

// @ts-ignore
export const MediaItemDetail = ({ globalState = { tags: [] } }: PageProps) => {
  const mediaItem = useAppSelector((state) => state?.mediaItem?.entity);
  const {
    _id,
    title = '',
    authorProfile = {} as AuthorProfileDto,
    createdBy,
    description = '',
    thumbnail,
    uri,
    category,
    shareCount = 0,
    viewCount = 0,
    likesCount = 0,
  } = mediaItem || {};

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
            authorProfile={authorProfile}
            description={description}
            mediaSrc={uri}
            showThumbnail={true}
            thumbnail={thumbnail}
            thumbnailStyle={{
              // TODO: Can we do this automatically from video metadata?
              aspectRatio: 1 / 1
            }}
            category={category}
            availableTags={mappedTags}
            tags={tagKeys}
            showSocial={true}
            showActions={false}
            isPlayable={true}
            likes={likesCount}
            shares={shareCount}
            views={viewCount}
          />
        </ScrollView>
      </PageContent>
    </PageContainer>
  );
};

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(MediaItemDetail));
