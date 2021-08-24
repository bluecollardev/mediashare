import { Container, Content, View } from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';
import AddFromFeed from '../../screens/AddFrom';
import styles from '../../screens/Home/styles';
import { useAppSelector } from '../../state';

export interface AddFromFeedContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface AddFromFeedContainerState {}

const AddFromFeedContainer = (props) => {
  const list = useAppSelector((state) => state.mediaItems.mediaItems);
  const map = new Map(list.map((itm) => [itm._id, { ...itm, checked: false }]));
  return (
    <Container style={styles.container}>
      <Content>
        <View>
          <AddFromFeed navigation={props.navigation} list={map} />
        </View>
      </Content>
    </Container>
  );
};
export default AddFromFeedContainer;
