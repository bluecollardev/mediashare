import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Container } from 'native-base';
import { Text } from 'react-native';

import { useGoBack, useViewMediaItem, useViewPlaylist } from '../../../hooks/NavigationHooks';

import { useAppSelector } from '../../../state';
import { getPlaylistById, updateUserPlaylist } from '../../../state/modules/playlists';
import { findMediaItems } from '../../../state/modules/media-items';

import { ActionButtons } from '../../layout/ActionButtons';
import { MediaList, MediaListType } from '../../layout/MediaList';

import { UpdatePlaylistDto } from '../../../rxjs-api';

import styles from '../../../styles';

export const AddToPlaylistContainer = ({ route }) => {
  const dispatch = useDispatch();
  const viewMediaItem = useViewMediaItem();
  const viewPlaylist = useViewPlaylist();
  const goBack = useGoBack();

  const actionCb = async () => {
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
  };

  const cancelCb = () => {
    setLoaded(false);
    goBack();
  };
  const playlist = useAppSelector((state) => state.playlist.selectedPlaylist);

  const mediaItemState: MediaListType[] = useAppSelector((state) => state.mediaItems.mediaItems);

  const [loaded, setLoaded] = useState(false);
  const [mediaItems, setMediaItems] = useState(playlist?.mediaItems as MediaListType[]);

  const updateMediaItemsList = function (bool: boolean, mediaItem: MediaListType) {
    const filtered = bool ? mediaItems.concat([mediaItem]) : mediaItems.filter((item) => item._id !== mediaItem._id);
    setMediaItems(filtered);
  };

  const { playlistId } = route.params;

  useEffect(() => {
    if (!loaded) {
      dispatch(getPlaylistById(playlistId));
      dispatch(findMediaItems());
      setLoaded(true);
    }
  }, [loaded, dispatch, playlistId]);

  if (!loaded && !mediaItems) {
    return <Text>Loading</Text>;
  }
  return (
    <Container style={styles.container}>
      <MediaList
        list={mediaItemState}
        isSelectable={true}
        onViewDetail={(item) => viewMediaItem({ mediaId: item._id, uri: item.uri })}
        addItem={(e) => updateMediaItemsList(true, e)}
        removeItem={(e) => updateMediaItemsList(false, e)}
      />
      <ActionButtons actionCb={actionCb} rightIcon="check-circle" actionLabel="Save" cancelLabel="Back" cancelCb={cancelCb} />
    </Container>
  );
};

export default AddToPlaylistContainer;
