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
import PageContainer from '../../layout/PageContainer';
import { useSpinner } from '../../../hooks/useSpinner';
import { ScrollView } from 'react-native';

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
  const [{ AppSpinner, startLoad, endLoad }] = useSpinner();

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
      startLoad();
      await dispatch(getFeedMediaItems());
      setLoaded(true);
      endLoad();
    };
    if (!loaded) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, dispatch]);
  if (!items && loaded) {
    return <Text>No items to download</Text>;
  }

  return (
    <PageContainer>
      <AppSpinner />
      <ScrollView>
        {items?.map((item, idx) => {
          const { key, size, lastModified } = item;

          return (
            <MediaListItem
              showActions={false}
              key={idx}
              title={key}
              description={size + lastModified}
              checked={false}
              onChecked={(v) => (v ? addItemCb(key) : removeItemCb(key))}
            />
          );
        })}
      </ScrollView>
      <ActionButtons actionCb={saveMedia} actionLabel="Next" cancelLabel="Back" cancelCb={goToMediaItems} />
    </PageContainer>
  );
};

export default AddFromFeedContainer;
