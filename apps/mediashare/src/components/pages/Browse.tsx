import React, { useEffect, useState } from 'react';
import { AuthorProfileDto, PlaylistResponseDto } from 'mediashare/rxjs-api';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { useUser } from 'mediashare/hooks/useUser';
import { useViewPlaylistById } from 'mediashare/hooks/navigation';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { ScrollView, View } from 'react-native';
import { List } from 'react-native-paper';
import { PageContainer, PageProps, MediaCard, ActionButtons } from 'mediashare/components/layout';
import { PlaylistsComponent } from './Playlists';
import { filterUnique } from 'mediashare/utils';
import { createRandomRenderKey } from 'mediashare/core/utils/uuid';

export const SharedList = () => {
  const { sharedItems } = useUser();
  // TODO: We're converting to set to filter out dupes, fix the actual issue, this is just a temporary workaround
  const list = filterUnique(sharedItems, 'title') || [];

  let sortedList = list.map((item) => {
    // const { mediaIds, description } = item;
    // const itemDescription = `${shortenText(description, 40)}\n${mediaIds.length || 0} videos`;
    // Hack to set playlist id as we're just casting a SharedItemDto to a PlaylistDto
    return Object.assign({}, item, { _id: item.playlistId }) as unknown as PlaylistResponseDto;
  });

  const viewPlaylistAction = useViewPlaylistById();
  const viewPlaylist = (item) => viewPlaylistAction({ playlistId: item.playlistId });

  return <PlaylistsComponent list={sortedList} onViewDetailClicked={viewPlaylist} />;
};

export const SharedBlock = () => {
  const randomKey = createRandomRenderKey();
  const { sharedItems } = useUser();
  const list = filterUnique(sharedItems, 'playlistId') || [];
  let sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  const viewPlaylistAction = useViewPlaylistById();
  const viewPlaylist = (item) => viewPlaylistAction({ playlistId: item.playlistId });

  return (
    <List.Section>
      {sortedList.map((item) => {
        // @ts-ignore
        const { playlistId, title, description, authorProfile = {} as AuthorProfileDto, imageSrc, sharedCount, sharesCount, likesCount } = item;
        return (
          <View key={`shared_block_${randomKey}_${playlistId}`} style={{ padding: 0, paddingTop: 0 }}>
            <MediaCard
              elevation={1}
              title={title}
              authorProfile={authorProfile}
              description={description}
              category="General"
              tags={['General']}
              thumbnail={imageSrc}
              showSocial={true}
              showActions={false}
              showThumbnail={true}
              shares={sharesCount}
              views={sharedCount}
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
  );
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
      {globalState?.displayMode === 'list' && <SharedList />}
      {globalState?.displayMode === 'article' && (
        <ScrollView>
          <SharedBlock />
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
