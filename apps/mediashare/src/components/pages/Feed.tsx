import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';
import { useAppSelector } from 'mediashare/store';
import { findItemsSharedWithMe } from 'mediashare/store/modules/shareItems';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { filterUnique } from 'mediashare/utils';
import { PageContainer, PageContent, PageProps } from 'mediashare/components/layout';
import { FeedTags, FeedRecentlyPlayed, FeedSharedByContact } from 'mediashare/components/feed';

export const Feed = ({
  globalState = {
    displayMode: 'list',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setDisplayMode: (value) => undefined,
  },
}: PageProps) => {
  const dispatch = useDispatch();
  const ShowMyShare = false;

  const { tags = [] } = globalState;
  const { entities, loaded, loading } = useAppSelector((state) => state?.shareItems?.sharedWithMe);
  const list = filterUnique(entities, '_id').filter((e) => (ShowMyShare ? e : e.sharedWith != e.sharedBy)) || [];

  useEffect(() => {
    loadData().then();
  }, []);

  return (
    <PageContainer>
      <PageContent>
        <ScrollView>
          <FeedTags list={tags} />
          <FeedRecentlyPlayed list={list} />
          <FeedSharedByContact list={list} />
        </ScrollView>
      </PageContent>
    </PageContainer>
  );

  async function loadData() {
    await dispatch(findItemsSharedWithMe());
  }
};

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(Feed));
