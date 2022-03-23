import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../store';
import { getPlaylistById, updateUserPlaylist } from '../../store/modules/playlists';
import { findMediaItems } from '../../store/modules/media-items';

import { withGlobalStateConsumer } from '../../core/globalState';

import { UpdatePlaylistDto } from '../../rxjs-api';

import { useGoBack, useViewMediaItem } from '../../hooks/NavigationHooks';
import { theme } from '../../styles';
import { shortenText } from '../../utils';
// import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { ActionButtons } from '../layout/ActionButtons';
import { MediaListType } from '../layout/MediaList';
import { MediaListItem } from '../layout/MediaListItem';
import { PageContainer, PageActions, PageProps, PageContent } from '../layout/PageContainer';

export const AddToPlaylist = ({ route, globalState }: PageProps) => {
  const { playlistId } = route.params;

  const dispatch = useDispatch();
  const viewMediaItem = useViewMediaItem();
  const goBack = useGoBack();

  const playlist = useAppSelector((state) => state.playlist.selected);

  const mediaItemEntities: MediaListType[] = useAppSelector((state) => state.mediaItems.entities);
  const [filteredMediaItemEntities, setFilteredMediaItemEntities] = useState([...mediaItemEntities] as MediaListType[]);

  const [loaded, setIsLoaded] = useState(false);
  // @ts-ignore
  const [mediaItems, setMediaItems] = useState((playlist?.mediaItems as MediaListType[]) || []);

  const searchFilters = globalState?.search?.filters || { text: '', tags: [] };
  const searchTags = searchFilters.tags || [];
  const prevSearchTagsRef = useRef(searchTags);
  useEffect(() => {
    // Only run this if search tags have actually changed in value
    if (JSON.stringify(prevSearchTagsRef.current) !== JSON.stringify(searchTags)) {
      if (Array.isArray(searchTags) && searchTags.length > 0) {
        const filtered = mediaItemEntities.filter((entity) => {
          if (Array.isArray(entity.tags) && entity.tags.length > 0) {
            const tagKeys = entity.tags.map((tag) => tag.key);
            const hasTag = !!searchTags
              // Make an array of true or false values
              .map((searchTag) => tagKeys.includes(searchTag))
              // If there are any true values return true, we have a match
              .find((isMatch) => isMatch === true);
            return hasTag;
          }
          return false;
        });
        setFilteredMediaItemEntities(filtered);
      } else if (searchTags.length === 0) {
        setFilteredMediaItemEntities(mediaItemEntities);
      }
      prevSearchTagsRef.current = searchTags;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTags]);

  useEffect(() => {
    if (!loaded) {
      dispatch(getPlaylistById(playlistId));
      const { search } = globalState;
      const args = { text: search?.filters?.text ? search.filters.text : '' };
      dispatch(findMediaItems(args));
      setIsLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, playlistId, globalState]);

  return (
    <PageContainer>
      <PageContent>
        <FlatList
          data={filteredMediaItemEntities && filteredMediaItemEntities.length > 0 ? filteredMediaItemEntities : mediaItemEntities}
          renderItem={({ item }) => renderVirtualizedListItem(item)}
          keyExtractor={({ _id }) => `playlist_${_id}`}
        />
      </PageContent>
      <PageActions>
        <ActionButtons onActionClicked={actionCb} actionLabel="Save" onCancelClicked={cancelCb} />
      </PageActions>
    </PageContainer>
  );

  /**
   * <MediaList
   list={mediaItemState}
   showThumbnail={true}
   selectable={true}
   onViewDetail={(item) => viewMediaItem({ mediaId: item._id, uri: item.uri })}
   addItem={(e) => updateMediaItemsList(true, e)}
   removeItem={(e) => updateMediaItemsList(false, e)}
   />
   * @param item
   */
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

  async function actionCb() {
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

  function cancelCb() {
    setIsLoaded(false);
    goBack();
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

export default withGlobalStateConsumer(AddToPlaylist);
