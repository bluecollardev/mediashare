import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import { useAppSelector } from 'mediashare/store';
import { getPlaylistById, updateUserPlaylist } from 'mediashare/store/modules/playlist';
import { findMediaItems } from 'mediashare/store/modules/mediaItems';
import { AuthorProfileDto, UpdatePlaylistDto } from 'mediashare/rxjs-api';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { withPlaylistSearch } from 'mediashare/components/hoc/withPlaylistSearch';
import { useGoBack, useViewMediaItemById } from 'mediashare/hooks/navigation';
import { PageContainer, PageActions, PageProps, PageContent, ActionButtons, MediaListType, MediaListItem, NoContent } from 'mediashare/components/layout';

import { theme } from 'mediashare/styles';

export const AddToPlaylistComponent = ({ entities, viewMediaItem, addItem, removeItem }) => {
  return <FlatList data={entities} renderItem={({ item }) => renderVirtualizedListItem(item)} keyExtractor={({ _id }) => `playlist_${_id}`} />;

  function renderVirtualizedListItem(item) {
    const { _id = '', title = '', authorProfile = {} as AuthorProfileDto, thumbnail = '' } = item;
    return (
      <>
        <MediaListItem
          key={`add_to_playlist_${_id}`}
          title={title}
          titleStyle={styles.titleText}
          description={<MediaListItem.Description data={{ authorProfile }} />}
          showThumbnail={true}
          showPlayableIcon={false}
          showActions={true}
          image={thumbnail}
          selectable={true}
          onViewDetail={() => {
            viewMediaItem({ mediaId: item._id, uri: item.uri }).then();
          }}
          onChecked={(v) => (v ? addItem(item) : removeItem(item))}
        />
        <Divider key={`playlist_divider_${item._id}`} />
      </>
    );
  }
};

const AddToPlaylistComponentWithSearch = withPlaylistSearch(AddToPlaylistComponent);

export const AddToPlaylist = ({ route, globalState }: PageProps) => {
  const { playlistId } = route.params;

  const dispatch = useDispatch();
  const viewMediaItem = useViewMediaItemById();
  const goBack = useGoBack();

  const playlist = useAppSelector((state) => state?.playlist?.selected);
  // @ts-ignore
  const [mediaItems, setMediaItems] = useState((playlist?.mediaItems as MediaListType[]) || []);

  const { loading, loaded, entities = [] as any[] } = useAppSelector((state) => state?.mediaItems);

  useEffect(() => {
    loadData().then();
  }, []);

  return (
    <PageContainer>
      <PageContent>
        <AddToPlaylistComponentWithSearch
          globalState={globalState}
          loaded={(!loaded && !loading) || (loaded && entities.length > 0)}
          loadData={loadData}
          searchTarget="media"
          entities={entities}
          viewMediaItem={viewMediaItem}
          addItem={addItem}
          removeItem={removeItem}
        />
        {loaded && entities.length === 0 && (
          <NoContent onPress={() => undefined} messageButtonText="There are no items in your media library to add." icon="info" />
        )}
      </PageContent>
      <PageActions>
        <ActionButtons onPrimaryClicked={saveItems} primaryLabel="Save" onSecondaryClicked={cancel} />
      </PageActions>
    </PageContainer>
  );

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
    await dispatch(getPlaylistById(playlistId));
    goBack();
  }

  function cancel() {
    goBack();
  }
};

const styles = StyleSheet.create({
  titleText: {
    marginBottom: 4,
    fontFamily: theme.fonts.medium.fontFamily,
  },
});

export default withLoadingSpinner((state) => {
  return !!state?.mediaItems?.loading || false;
})(withGlobalStateConsumer(AddToPlaylist));
