import { Container, Content, View } from 'native-base';
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import AddFromFeed from '../../screens/AddFrom';
import styles from '../../screens/Home/styles';
import { useAppSelector } from '../../state';
import ActionButtons from '../../components/layout/ActionButtons';
import { routeConfig } from '../../routes';
import { setMediaIds } from '../../state/modules/create-playlist';

export interface AddFromFeedContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface AddFromFeedContainerState {}

const AddFromFeedContainer = (props) => {
  const dispatch = useDispatch();

  const createDto = useAppSelector((state) => state.createPlaylist);
  const mediaItems = useAppSelector((state) => state.mediaItems.mediaItems).filter((mediaItem) => mediaItem.checked);
  const actionCb = () => {
    const mediaIds = mediaItems.map((item) => item?._id);
    dispatch(setMediaIds(mediaIds));
    const segment = createDto.title.length > 0 ? routeConfig.playlistDetail.name : routeConfig.playlistEdit.name;
    props.navigation.navigate(segment);
  };

  return (
    <Container style={styles.container}>
      <Content>
        <View>
          <AddFromFeed navigation={props.navigation} />
        </View>
      </Content>
      <ActionButtons actionCb={actionCb} actionLabel="Next" cancelLabel="Back" disableAction={mediaItems.length < 1} cancelCb={props.navigation.goBack} />
    </Container>
  );
};
export default AddFromFeedContainer;
