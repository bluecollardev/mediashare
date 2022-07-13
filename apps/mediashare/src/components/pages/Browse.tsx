import { mapAvailableTags } from 'mediashare/core/utils/tags';
import { useAppSelector } from 'mediashare/store';
import React, { useEffect, useMemo, useState } from 'react';
import { AuthorProfileDto } from 'mediashare/rxjs-api';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { useViewPlaylistById } from 'mediashare/hooks/navigation';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { ScrollView, View } from 'react-native';
import { List } from 'react-native-paper';
import { PageContainer, PageProps, MediaCard, ActionButtons, NoContent } from 'mediashare/components/layout';
import { PlaylistsComponent } from './Playlists';
import { filterUnique, shortenText } from 'mediashare/utils';
import { createRandomRenderKey } from 'mediashare/core/utils/uuid';

export const SharedList = ({ globalState }) => {
  const { entities, loaded, loading } = useAppSelector((state) => state?.shareItems?.sharedWithMe);
  const ShowMyShare = false;
  // TODO: There are dupes, this is just a temporary workaround; we shouldn't be able to create dupe share items
  const list = filterUnique(entities, '_id').filter((e) => (ShowMyShare ? e : e.sharedWith != e.sharedBy)) || [];

  const viewPlaylistAction = useViewPlaylistById();
  const viewPlaylist = (item) => viewPlaylistAction({ playlistId: item._id });

  return (!loaded && !loading) || (loaded && list.length > 0) ? (
    <PlaylistsComponent list={list} onViewDetailClicked={viewPlaylist} />
  ) : loaded && list.length === 0 ? (
    <NoContent messageButtonText="Items that are shared with you will show up in your feed." icon="view-list" />
  ) : null;
};

export const SharedBlock = ({ globalState }) => {
  const { tags = [] } = globalState;

  const randomKey = createRandomRenderKey();
  const { entities, loaded, loading } = useAppSelector((state) => state?.shareItems?.sharedWithMe);
  // TODO: There are dupes, this is just a temporary workaround; we shouldn't be able to create dupe share items
  const list = filterUnique(entities, '_id') || [];
  list.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  const viewPlaylistAction = useViewPlaylistById();
  const viewPlaylist = (item) => viewPlaylistAction({ playlistId: item._id });

  return (!loaded && !loading) || (loaded && list.length > 0) ? (
    <List.Section>
      {list.map((item) => {
        // @ts-ignore
        const { _id, title, description, authorProfile = {} as AuthorProfileDto, imageSrc, category, shareCount, viewCount, likesCount } = item;
        const tagKeys = (item?.tags || []).map(({ key }) => key);
        const mappedTags = useMemo(() => mapAvailableTags(tags).filter((tag) => tag.isPlaylistTag), []);
        return (
          <View key={`shared_block_${randomKey}_${_id}`} style={{ padding: 0, paddingTop: 0 }}>
            <MediaCard
              elevation={1}
              title={title}
              authorProfile={authorProfile}
              description={shortenText(description, 200)}
              thumbnail={imageSrc}
              showThumbnail={true}
              category={category}
              availableTags={mappedTags}
              tags={tagKeys}
              showSocial={true}
              showActions={false}
              showDescription={true}
              shares={shareCount}
              views={viewCount}
              likes={likesCount}
            >
              <ActionButtons
                containerStyles={{ marginHorizontal: 0, marginVertical: 15 }}
                showCancel={false}
                showAction={true}
                actionLabel="Watch Now"
                actionIcon="live-tv"
                onActionClicked={() => viewPlaylist(item)}
              />
            </MediaCard>
          </View>
        );
      })}
    </List.Section>
  ) : loaded && list.length === 0 ? (
    <NoContent messageButtonText="Items that are shared with you will show up in your feed." icon="article" />
  ) : null;
};

export const Browse = ({
  globalState = {
    displayMode: 'list',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setDisplayMode: (value) => undefined,
  },
}: PageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [prevSearchFilters, setPrevSearchFilters] = useState({ filters: { text: '' } });

  useEffect(() => {
    loadData().then();
  }, []);

  useEffect(() => {
    const currentSearchFilters = globalState?.search;
    if (!isLoaded || currentSearchFilters !== prevSearchFilters) {
      setPrevSearchFilters(currentSearchFilters);
      loadData().then();
    }
  }, [isLoaded, globalState]);

  return (
    <PageContainer>
      {globalState?.displayMode === 'list' && <SharedList globalState={globalState} />}
      {globalState?.displayMode === 'article' && (
        <ScrollView>
          <SharedBlock globalState={globalState} />
        </ScrollView>
      )}
    </PageContainer>
  );

  async function loadData() {
    const { search } = globalState;
    const args = {
      text: search?.filters?.text ? search.filters.text : '',
      // tags: [],
    };

    if (search.filters.text) {
      // await dispatch(findPlaylists(args));
    } else {
      // await dispatch(getUserPlaylists({}));
    }

    setIsLoaded(true);
  }
};

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(Browse));
