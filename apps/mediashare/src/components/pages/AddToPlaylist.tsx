import React, { useEffect, useState } from 'react';
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
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { ActionButtons } from '../layout/ActionButtons';
import { MediaList, MediaListType } from '../layout/MediaList';
import { MediaListItem } from '../layout/MediaListItem';
import { PageContainer, PageContent, PageActions, PageProps } from '../layout/PageContainer';

export const AddToPlaylist = ({ route, globalState }: PageProps) => {
  const dispatch = useDispatch();

  const viewMediaItem = useViewMediaItem();
  const goBack = useGoBack();

  const playlist = useAppSelector((state) => state.playlist.selected);

  const mediaItemState: MediaListType[] = useAppSelector((state) => state.mediaItems.entities);

  const [loaded, setIsLoaded] = useState(false);
  // @ts-ignore
  const [mediaItems, setMediaItems] = useState((playlist?.mediaItems as MediaListType[]) || []);

  const { playlistId } = route.params;

  useEffect(() => {
    if (!loaded) {
      dispatch(getPlaylistById(playlistId));
      const { search } = globalState;
      const args = { text: search?.filters?.text ? search.filters.text : '' };
      // console.log(`AddToPlaylist.useEffect > Dispatch findMediaItems with args: ${JSON.stringify(args, null, 2)}`);
      dispatch(findMediaItems(args));
      setIsLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, playlistId, globalState]);

  return (
    <PageContainer>
      <View>
        <FlatList
          data={mediaItemState}
          renderItem={({ item }) => renderVirtualizedListItem(item)}
          keyExtractor={({ _id }) => `playlist_${_id}`}
        />
      </View>
      <PageActions>
        <ActionButtons actionCb={actionCb} rightIcon="check-circle" actionLabel="Save" cancelLabel="Cancel" cancelCb={cancelCb} />
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
                <Text style={{ ...styles.description }}>{shortenText(description || '', 52)}</Text>
                <Text style={{ ...styles.videoCount }}>{mediaIds?.length || 0} videos</Text>
              </View>
            );
          }}
          image={thumbnail}
          // showActions={showActions}
          // selectable={selectable}
          // onViewDetail={() => onViewDetailClicked(item)}
          // onChecked={(checked) => onChecked(checked, item)}
          // Fix these
          showThumbnail={true}
          selectable={true}
          // onViewDetail={(item) => viewMediaItem({ mediaId: item._id, uri: item.uri })}
          // addItem={(e) => updateMediaItemsList(true, e)}
          // removeItem={(e) => updateMediaItemsList(false, e)}
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
