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
      const dispatched = await dispatch(createPlaylist({ ...createDto, mediaIds }));
      console.log('🚀 ------------------------------------------------------------------');
      console.log('🚀 ~ file: index.tsx ~ line 33 ~ actionCb ~ dispatched', dispatched);
      console.log('🚀 ------------------------------------------------------------------');
      dispatch(clearMediaItemSelection());
      navigation.navigate('Playlists', { screen: routeConfig.playlistDetail.name });
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
