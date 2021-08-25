import { Container, Content, View } from 'native-base';
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import AddFromFeed from '../../screens/AddFrom';
import styles from '../../screens/Home/styles';
import { useAppSelector } from '../../state';
import ActionButtons from '../../components/layout/ActionButtons';
import { getRoute, routeConfig } from '../../routes';
import { createPlaylist, setMediaIds } from '../../state/modules/create-playlist';
import { findMediaItems, clearMediaItemSelection } from '../../state/modules/media-items/index';
import { findUserPlaylists } from '../../state/modules/playlists';

export interface AddFromFeedContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface AddFromFeedContainerState {}

const AddFromFeedContainer = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isCreate = route?.params.state;

  const createDto = useAppSelector((state) => state.createPlaylist);
  const mediaItems = useAppSelector((state) => state.mediaItems.mediaItems).filter((mediaItem) => mediaItem.checked);
  const items = useAppSelector((state) => state.mediaItems.mediaItems);
  if (items.length < 1) {
    dispatch(findMediaItems());
  }

  const actionCb = async () => {
    const mediaIds = mediaItems.map((item) => item?._id);
    dispatch(setMediaIds(mediaIds));
    const segment = createDto.title.length > 0 ? routeConfig.playlists.name : routeConfig.playlistEdit.name;

    if (createDto.title.length > 0) {
      await dispatch(createPlaylist({ ...createDto, mediaIds }));

      dispatch(clearMediaItemSelection());
      await dispatch(findUserPlaylists({}));
    } else {
      navigation.navigate(segment, { state: 'create' });
    }
  };

  if (items) {
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <AddFromFeed navigation={navigation} items={items} onViewDetail={() => navigation.navigate(getRoute('playlistDetail'))} />
          </View>
        </Content>
        <ActionButtons actionCb={actionCb} actionLabel="Next" cancelLabel="Back" disableAction={mediaItems.length < 1} cancelCb={navigation.goBack} />
      </Container>
    );
  }
};
export default AddFromFeedContainer;
