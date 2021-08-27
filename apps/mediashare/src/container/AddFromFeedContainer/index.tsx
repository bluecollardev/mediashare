import { Container, Content, List, Text, View } from 'native-base';
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import AddFromFeed from '../../screens/AddFrom';
import styles from '../../screens/Home/styles';
import { useAppSelector } from '../../state';
import ActionButtons from '../../components/layout/ActionButtons';
import { getRoute, routeConfig, ROUTES } from '../../routes';
import { createPlaylist, setMediaIds } from '../../state/modules/create-playlist';
import { getFeedMediaItems, saveFeedMediaItems } from '../../state/modules/media-items/index';
import { useEffect } from 'react';
import { mediaItems } from '../../state/apis';
import { useRouteName } from '../../hooks/NavigationHooks';
import { ListItemGroup } from '../../components/layout/ListItemGroup';
import { MediaListItem } from '../../components/layout/MediaListItem';

export interface AddFromFeedContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface AddFromFeedContainerState {}

const AddFromFeedContainer = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const goToMediaItems = useRouteName(ROUTES.library);
  const selectedItems = new Set<string>();

  const addItemCb = function (id: string) {
    selectedItems.add(id);
  };
  const removeItemCb = function (id: string) {
    selectedItems.delete(id);
  };

  const isCreate = route?.params.state;

  const [loaded, setLoaded] = React.useState(false);
  const items = useAppSelector((state) => state.mediaItem.feed);

  const saveMedia = async function () {
    if (selectedItems.size < 1) {
      return;
    }
    const items = Array.from(selectedItems.values());
    const res = await dispatch(saveFeedMediaItems({ keys: items }));
    console.log(res);
    goToMediaItems();
  };
  useEffect(() => {
    if (!loaded) {
      dispatch(getFeedMediaItems());
      setLoaded(true);
    }
  }, [loaded, dispatch]);
  if (!items && loaded) {
    return <Text>No items to download</Text>;
  }
  if (!items) {
    return <Text>...loading</Text>;
  }
  if (items) {
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <List>
              <ListItemGroup key={'group1'} />
              {items.map((item, idx) => {
                const { key, size, lastModified } = item;

                return (
                  <MediaListItem
                    key={idx}
                    title={key}
                    description={size + lastModified}
                    checked={false}
                    onChecked={(v) => (v ? addItemCb(key) : removeItemCb(key))}
                  />
                );
              })}
            </List>
          </View>
        </Content>
        <ActionButtons actionCb={saveMedia} actionLabel="Next" cancelLabel="Back" cancelCb={goToMediaItems} />
      </Container>
    );
  }
};
export default AddFromFeedContainer;
