import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { useAppSelector } from 'mediashare/store';
import { getPlaylistById, updateUserPlaylist } from 'mediashare/store/modules/playlists';
import { findMediaItems } from 'mediashare/store/modules/mediaItems';
import { UpdatePlaylistDto } from 'mediashare/rxjs-api';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { useGoBack, useViewMediaItem } from 'mediashare/hooks/NavigationHooks';
import { PageContainer, PageActions, PageProps, PageContent, NoItems, ActionButtons, MediaListType, MediaListItem } from 'mediashare/components/layout';
import { shortenText } from 'mediashare/utils';
import { theme } from 'mediashare/styles';

export const AddToPlaylist = ({ route, globalState }: PageProps) => {
  const { playlistId } = route.params;

  const dispatch = useDispatch();
  const viewMediaItem = useViewMediaItem();
  const goBack = useGoBack();

  const playlist = useAppSelector((state) => state.playlist.selected);
  // @ts-ignore
  const [mediaItems, setMediaItems] = useState((playlist?.mediaItems as MediaListType[]) || []);

  const { loading, loaded, entities = [] as any[] } = useAppSelector((state) => state?.mediaItems);
  const [isLoaded, setIsLoaded] = useState(loaded);
  useEffect(() => {
    if (loaded && !isLoaded) {
      setIsLoaded(true);
    }
  }, [loaded]);

  const searchFilters = globalState?.search?.filters || { text: '', tags: [] };
  const [prevSearchFilters, setPrevSearchFilters] = useState({ filters: { text: '', tags: [] } });
  useEffect(() => {
    const currentSearchFilters = globalState?.search;
    if (!isLoaded || JSON.stringify(currentSearchFilters) !== JSON.stringify(prevSearchFilters)) {
      setPrevSearchFilters(currentSearchFilters);
      loadData().then();
    }
  }, [isLoaded, globalState, searchFilters]);

  return (
    <PageContainer>
      <PageContent>
        {isLoaded ? (
          <FlatList data={entities} renderItem={({ item }) => renderVirtualizedListItem(item)} keyExtractor={({ _id }) => `playlist_${_id}`} />
        ) : (
          <NoItems text={loading ? 'Loading...' : 'There are no items in your media library.'} />
        )}
      </PageContent>
      <PageActions>
        <ActionButtons onActionClicked={saveItems} actionLabel="Save" onCancelClicked={cancel} />
      </PageActions>
    </PageContainer>
  );

  function renderVirtualizedListItem(item) {
    const { _id = '', title = '', author = '', description = '', mediaIds = [], thumbnail = '' } = item;
    return (
      <>
        <MediaListItem
          key={`playlist_${_id}`}
          title={title}
          titleStyle={styles.title}
          description={() => {
            return (
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                {!!author && <Text style={styles.username}>By {author}</Text>}
                <Text style={{ ...styles.description }}>{shortenText(description || '', 80)}</Text>
                <Text style={{ ...styles.videoCount }}>{mediaIds?.length || 0} videos</Text>
              </View>
            );
          }}
          image={thumbnail}
          showThumbnail={true}
          selectable={true}
          showActions={true}
          onViewDetail={() => {
            viewMediaItem({ mediaId: item._id, uri: item.uri }).then();
          }}
          onChecked={(v) => (v ? addItem(item) : removeItem(item))}
        />
        <Divider key={`playlist_divider_${item._id}`} />
      </>
    );
  }

  async function loadData() {
    const { search } = globalState;
    const args = {
      text: search?.filters?.text ? search.filters.text : '',
      tags: search?.filters?.tags || [],
    };

    await dispatch(getPlaylistById(playlistId));
    if (args.text || args.tags.length > 0) {
      await dispatch(findMediaItems(args));
    } else {
      await dispatch(findMediaItems({}));
    }
  }

  function addItem(e) {
    return updateMediaItemsList(true, e);
  }

  function removeItem(e) {
    return updateMediaItemsList(false, e);
  }

  function updateMediaItemsList(bool: boolean, mediaItem: MediaListType) {
    const filtered = bool ? mediaItems.concat([mediaItem]) : mediaItems.filter((item) => item._id !== mediaItem._id);
    setMediaItems(filtered);
  }

  async function saveItems() {
    const { category, tags } = playlist as any;
    const dto: UpdatePlaylistDto = {
      mediaIds: mediaItems.map((item) => item._id),
      description: playlist.description,
      title: playlist.title,
      category: category,
      tags: tags,
      _id: playlistId,
      // @ts-ignore
      imageSrc: playlist?.imageSrc,
    };
    await dispatch(updateUserPlaylist(dto));
    setIsLoaded(false);
    goBack();
  }

  function cancel() {
    setIsLoaded(false);
    goBack();
  }
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 2,
  },
  author: {
    color: theme.colors.textDarker,
    fontSize: 12,
    marginBottom: 2,
  },
  username: {
    color: theme.colors.primary,
    fontSize: 12,
    marginBottom: 4,
  },
  description: {
    color: theme.colors.textDarker,
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
  videoCount: {
    color: theme.colors.textDarker,
    fontSize: 12,
    marginBottom: 2,
    fontWeight: 'bold',
  },
});

export default withLoadingSpinner((state) => {
  return !!state?.mediaItems?.loading || false;
})(withGlobalStateConsumer(AddToPlaylist));
