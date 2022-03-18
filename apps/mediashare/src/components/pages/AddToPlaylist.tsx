import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../store';
import { getPlaylistById, updateUserPlaylist } from '../../store/modules/playlists';
import { findMediaItems } from '../../store/modules/media-items';

import { withGlobalStateConsumer } from '../../core/globalState';

import { UpdatePlaylistDto } from '../../rxjs-api';

import { useGoBack, useViewMediaItem } from '../../hooks/NavigationHooks';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { ActionButtons } from '../layout/ActionButtons';
import { MediaList, MediaListType } from '../layout/MediaList';
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
      <PageContent>
        <MediaList
          list={mediaItemState}
          showThumbnail={true}
          selectable={true}
          onViewDetail={(item) => viewMediaItem({ mediaId: item._id, uri: item.uri })}
          addItem={(e) => updateMediaItemsList(true, e)}
          removeItem={(e) => updateMediaItemsList(false, e)}
        />
      </PageContent>
      <PageActions>
        <ActionButtons actionCb={actionCb} rightIcon="check-circle" actionLabel="Save" cancelLabel="Cancel" cancelCb={cancelCb} />
      </PageActions>
    </PageContainer>
  );

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

export default withLoadingSpinner(withGlobalStateConsumer(AddToPlaylist));
