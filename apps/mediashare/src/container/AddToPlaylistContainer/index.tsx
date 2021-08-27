import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../state/index';
import { getPlaylistById, updateUserPlaylist } from '../../state/modules/playlists/index';
import { findMediaItems } from '../../state/modules/media-items/index';
import { useViewMediaItem, useViewPlaylist, useRouteName, useGoBack } from '../../hooks/NavigationHooks';
import { Text } from 'react-native';
import MediaList, { MediaListType } from '../../components/layout/MediaList';
import { UpdatePlaylistDto, UpdatePlaylistDtoCategoryEnum } from '../../rxjs-api/models/UpdatePlaylistDto';
import { ROUTES } from '../../routes';
import { Container } from 'native-base';
import ActionButtons from '../../components/layout/ActionButtons';
import styles from '../../screens/Home/styles';

export interface AddToPlaylistContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface AddToPlaylistContainerState {}

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
      <ActionButtons actionCb={actionCb} actionLabel="Next" cancelLabel="Back" cancelCb={cancelCb} />
    </Container>
  );
};

export default AddToPlaylistContainer;
