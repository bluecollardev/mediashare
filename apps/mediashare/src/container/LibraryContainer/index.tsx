import * as React from 'react';
import { useDispatch } from 'react-redux';
import Library from '../../screens/Library';

import { findMediaItems } from '../../state/modules/media-items';

import { useAppSelector } from '../../state/index';
import { Button, Container, Content, Icon, Text, View } from 'native-base';
import { routeConfig } from '../../routes';
import styles from '../../screens/Home/styles';

export interface LibraryContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}
const LibraryContainer = (props: { navigation: any }) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const { loaded, loading, mediaItems } = useAppSelector((state) => state.mediaItems);

  if (!loaded && !loading && mediaItems.length < 1) {
    console.log('dispatched');
    dispatch(findMediaItems());
  }

  return (
    <Container style={styles.container}>
      <View padder style={{ flexDirection: 'row' }}>
        <Button
          iconLeft
          bordered
          dark
          style={{ flex: 1, marginRight: 10 }}
          onPress={() => navigation.navigate(routeConfig.addFromFeed.name, { state: 'create' })}
        >
          <Icon name="add-outline" />
          <Text style={{ paddingRight: 30 }}>Add From Feed</Text>
        </Button>
        <Button
          iconLeft
          bordered
          dark
          style={{ flex: 1 }}
          onPress={() => {
            navigation.navigate(routeConfig.addMedia.name);
          }}
        >
          <Icon name="add-outline" />
          <Text style={{ paddingRight: 30 }}>Add Media</Text>
        </Button>
      </View>
      <Content>
        <Library navigation={props.navigation} list={mediaItems} />
      </Content>
      <View padder style={{ flexDirection: 'row' }}>
        <Button
          iconLeft
          bordered
          dark
          style={{ flex: 1, justifyContent: 'center' }}
          onPress={() => {
            navigation.navigate(routeConfig.addFromLibrary.name);
          }}
        >
          <Icon name="add-outline" />
          <Text style={{ paddingRight: 30 }}>Add to Playlist</Text>
        </Button>
      </View>
    </Container>
  );
};

export default LibraryContainer;
