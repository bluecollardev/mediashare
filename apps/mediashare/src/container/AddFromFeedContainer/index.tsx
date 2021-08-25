import { Container, Content, View } from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';
import AddFromFeed from '../../screens/AddFrom';
import styles from '../../screens/Home/styles';
import { useAppSelector } from '../../state';
import ActionButtons from '../../components/layout/ActionButtons';
import { routeConfig } from '../../routes';

export interface AddFromFeedContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface AddFromFeedContainerState {}

const AddFromFeedContainer = (props) => {
  const hasCreateDetail = useAppSelector((state) => !!state.createPlaylist.title);
  const actionCb = () => {
    const segment = hasCreateDetail ? routeConfig.playlistDetail.name : routeConfig.playlistEdit.name;
    props.navigation.navigate(segment);
  };

  return (
    <Container style={styles.container}>
      <Content>
        <View>
          <AddFromFeed navigation={props.navigation} />
        </View>
      </Content>
    </Container>
  );
};
export default AddFromFeedContainer;
