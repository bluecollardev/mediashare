import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useGoBack, useViewMediaItem, useViewPlaylist } from '../../hooks/NavigationHooks';

import { useAppSelector } from '../../state';
import { findUserPlaylists, getPlaylistById, updateUserPlaylist } from '../../state/modules/playlists';
import { findMediaItems } from '../../state/modules/media-items';

import { ScrollView, View } from 'react-native';
import { ActionButtons } from '../layout/ActionButtons';
import { MediaList, MediaListType } from '../layout/MediaList';
import { PageContainer } from '../layout/PageContainer';

import { UpdatePlaylistDto } from '../../rxjs-api';

export const AddToPlaylistContainer = ({ route }) => {
  const dispatch = useDispatch();

  const viewMediaItem = useViewMediaItem();
  const viewPlaylist = useViewPlaylist();
  const goBack = useGoBack();

  const playlist = useAppSelector((state) => state.playlist.selectedPlaylist);

  const mediaItemState: MediaListType[] = useAppSelector((state) => state.mediaItems.mediaItems);

  const [loaded, setLoaded] = useState(false);
  const [mediaItems, setMediaItems] = useState(playlist?.mediaItems as MediaListType[]);

  const { playlistId } = route.params;

  useEffect(() => {
    if (!loaded) {
      dispatch(getPlaylistById(playlistId));
      dispatch(findMediaItems());
      setLoaded(true);
    }
  }, [loaded, dispatch, playlistId]);

  return (
    <PageContainer>
      <ScrollView>
        <MediaList
          list={mediaItemState}
          isSelectable={true}
          onViewDetail={(item) => viewMediaItem({ mediaId: item._id, uri: item.uri })}
          addItem={(e) => updateMediaItemsList(true, e)}
          removeItem={(e) => updateMediaItemsList(false, e)}
        />
      </ScrollView>
      <View>
        <ActionButtons actionCb={actionCb} rightIcon="check-circle" actionLabel="Save" cancelLabel="Back" cancelCb={cancelCb} />
      </View>
    </PageContainer>
  );

  async function actionCb() {
    const { category } = playlist as any;
    const dto: UpdatePlaylistDto = {
      mediaIds: mediaItems.map((item) => item._id),
      description: playlist.description,
      title: playlist.title,
      category: category,
      _id: playlistId,
    };
    await dispatch(updateUserPlaylist(dto));
    setLoaded(false);
    viewPlaylist({ playlistId });
  }

  function cancelCb() {
    setLoaded(false);
    goBack();
  }

  function updateMediaItemsList(bool: boolean, mediaItem: MediaListType) {
    const filtered = bool ? mediaItems.concat([mediaItem]) : mediaItems.filter((item) => item._id !== mediaItem._id);
    setMediaItems(filtered);
  }
};

export default AddToPlaylistContainer;
