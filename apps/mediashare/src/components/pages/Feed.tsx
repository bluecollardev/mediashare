import React, { useEffect } from 'react';
import { Divider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';
import { useAppSelector } from 'mediashare/store';
import { findItemsSharedWithMe } from 'mediashare/store/modules/shareItems';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { filterUnique } from 'mediashare/utils';
import { withPlaylistSearch } from 'mediashare/components/hoc/withPlaylistSearch';
import { NoContent, PageContainer, PageContent, PageProps } from 'mediashare/components/layout';
import { FeedTags, FeedRecentlyPlayed, FeedSharedByContact } from 'mediashare/components/feed';

const FeedComponent = ({ list, tags }) => {
  return (
    <>
      <FeedTags list={tags} />
      <Divider style={{ marginTop: 10, marginBottom: 20 }} />
      <FeedSharedByContact list={list} />
      <Divider style={{ marginTop: 10, marginBottom: 20 }} />
      <FeedRecentlyPlayed list={list} />
    </>
  );
};

const FeedComponentWithSearch = withPlaylistSearch(FeedComponent);

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
          {(!loaded && !loading) || (loaded && list.length > 0) && (
            <FeedComponentWithSearch
              globalState={globalState}
              loaded={(!loaded && !loading) || (loaded && entities.length > 0)}
              loadData={loadData}
              searchTarget="playlists"
              list={list}
              tags={tags}
            />
          )}
          {loaded && list.length === 0 && (
            <NoContent messageButtonText="Items that are shared with you will show up in your feed." icon="view-list" />
          )}
        </ScrollView>
      </PageContent>
    </PageContainer>
  );

  async function loadData() {
    await dispatch(findItemsSharedWithMe());
  }
};

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(Feed));
