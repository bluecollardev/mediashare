import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { getFeedMediaItems, saveFeedMediaItems } from '../../state/modules/media-items';

import { useRouteName, useMediaItems } from '../../hooks/NavigationHooks';
import { ActionButtons } from '../layout/ActionButtons';
import { MediaListItem } from '../layout/MediaListItem';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { useSpinner } from '../../hooks/useSpinner';

import { PageContainer, PageProps } from '../layout/PageContainer';
import { ScrollView, View } from 'react-native';
import { Subheading, Card } from 'react-native-paper';
import { findUserPlaylists } from '../../state/modules/playlists';
import { AwsMediaItem } from '../../state/modules/media-items/aws-media-item.model';

export const AddFromFeed = ({ navigation }: PageProps) => {
  const dispatch = useDispatch();

  const goToMediaItems = useMediaItems();
  const selectedItems = new Set<AwsMediaItem>();

  const addItemCb = function (item: AwsMediaItem) {
    selectedItems.add(item);
  };
  const removeItemCb = function (item: AwsMediaItem) {
    selectedItems.delete(item);
  };

  const [loaded, setIsLoaded] = useState(false);
  const items = useAppSelector((state) => state.mediaItem.feed);
  const [{ AppSpinner, startLoad, endLoad }] = useSpinner();

  const saveMedia = async function () {
    if (selectedItems.size < 1) {
      return;
    }
    const items = Array.from(selectedItems.values());
    await dispatch(saveFeedMediaItems({ items }));
    goToMediaItems();
  };
  useEffect(() => {
    const loadData = async function () {
      startLoad();
      await dispatch(getFeedMediaItems());
      setIsLoaded(true);
      endLoad();
    };

    if (!loaded) {
      loadData().then(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, dispatch]);

  return (
    <PageContainer>
      <View style={{ flex: 1 }}>
        {(!items || items.length === 0) && loaded && (
          <Card>
            <Card.Content>
              <Subheading style={{ textAlign: 'center' }}>Your media collection is in sync!</Subheading>
            </Card.Content>
          </Card>
        )}
        <ScrollView>
          {items?.map((item, idx) => {
            const { key, size, lastModified } = item;
            return (
              <MediaListItem
                showActions={false}
                key={idx}
                title={key}
                description={`${size} - ${lastModified}`}
                checked={false}
                onChecked={(v) => (v ? addItemCb(item) : removeItemCb(item))}
              />
            );
          })}
        </ScrollView>
        <View>
          <ActionButtons actionCb={saveMedia} rightIcon="check-circle" actionLabel="Add" cancelLabel="Back" cancelCb={goToMediaItems} />
        </View>
      </View>
    </PageContainer>
  );
};

export default withLoadingSpinner(AddFromFeed);
