import { Container, Content, List, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../../routes';

import { useAppSelector } from '../../../state';
import { getFeedMediaItems, saveFeedMediaItems, toggleMediaItem } from '../../../state/modules/media-items';

import { useRouteName } from '../../../hooks/NavigationHooks';
import { ActionButtons } from '../../layout/ActionButtons';
import { ListItemGroup } from '../../layout/ListItemGroup';
import { MediaListItem } from '../../layout/MediaListItem';

import { MediaItem } from '../../../rxjs-api';

import styles from '../../../styles';

export interface AddFromFeedProps {
  navigation: any;
  onViewDetail: () => void;
  items: MediaItem[];
}

export interface AddFromFeedState {}

export interface AddFromFeedContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}

export interface AddFromFeedContainerState {}

export const AddFromFeedContainer = () => {
  const dispatch = useDispatch();
  const goToMediaItems = useRouteName(ROUTES.media);
  const selectedItems = new Set<string>();

  const addItemCb = function (id: string) {
    selectedItems.add(id);
  };
  const removeItemCb = function (id: string) {
    selectedItems.delete(id);
  };

  const [loaded, setLoaded] = useState(false);
  const items = useAppSelector((state) => state.mediaItem.feed);
  console.log(items);

  const saveMedia = async function () {
    if (selectedItems.size < 1) {
      return;
    }
    const items = Array.from(selectedItems.values());
    const res = await dispatch(saveFeedMediaItems({ keys: items }));
    goToMediaItems();
  };
  useEffect(() => {
    const loadData = async function () {
      await dispatch(getFeedMediaItems());
      setLoaded(true);
    };
    if (!loaded) {
      loadData();
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
