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

export interface AddFromProps {
  navigation: any;
  onViewDetail: () => void;
  items: MediaItem[];
}

export interface AddFromState {}

export const AddFrom = ({ onViewDetail = () => {}, items }: AddFromProps) => {
  const dispatch = useDispatch();

  function toggleField(id: number) {
    dispatch(toggleMediaItem(id));
  }

  return (
    <List>
      <ListItemGroup key={'group1'} />
      {items.concat([]).map((item, idx) => {
        const { title, description, thumbnail } = item;
        return (
          <MediaListItem
            key={`item-${idx}`}
            title={title}
            description={description}
            image={thumbnail}
            checked={false}
            onChecked={() => toggleField(idx)}
            onViewDetail={onViewDetail}
          />
        );
      })}
    </List>
  );
};

export interface AddFromFeedContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface AddFromFeedContainerState {}

export const AddFromFeedContainer = () => {
  const dispatch = useDispatch();
  const goToMediaItems = useRouteName(ROUTES.library);
  const selectedItems = new Set<string>();

  const addItemCb = function (id: string) {
    selectedItems.add(id);
  };
  const removeItemCb = function (id: string) {
    selectedItems.delete(id);
  };

  const [loaded, setLoaded] = useState(false);
  const items = useAppSelector((state) => state.mediaItem.feed);

  const saveMedia = async function () {
    if (selectedItems.size < 1) {
      return;
    }
    const items = Array.from(selectedItems.values());
    const res = await dispatch(saveFeedMediaItems({ keys: items }));
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
