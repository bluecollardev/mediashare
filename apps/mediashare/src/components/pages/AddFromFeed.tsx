import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../store';
import { getFeedMediaItems, saveFeedMediaItems } from '../../store/modules/media-items';

import { useMediaItems } from '../../hooks/NavigationHooks';
import { ActionButtons } from '../layout/ActionButtons';
import { MediaListItem } from '../layout/MediaListItem';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { PageContainer, PageContent, PageActions, PageProps } from '../layout/PageContainer';
import { Subheading, Card } from 'react-native-paper';
import { AwsMediaItem } from '../../store/modules/media-items/aws-media-item.model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const items = useAppSelector((state) => state?.mediaItem?.feed);

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
      await dispatch(getFeedMediaItems());
      setIsLoaded(true);
    };

    if (!loaded) {
      loadData().then(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, dispatch]);

  return (
    <PageContainer>
      <PageContent>
        {(!items || items.length === 0) && loaded && (
          <Card>
            <Card.Content>
              <Subheading style={{ textAlign: 'center' }}>There are no items to import in your bucket.</Subheading>
            </Card.Content>
          </Card>
        )}
        <FlatList data={items} renderItem={({ item }) => renderVirtualizedListItem(item)} />
      </PageContent>
      <PageActions>
        <ActionButtons onActionClicked={saveMedia} actionLabel="Add Media" onCancelClicked={goToMediaItems} />
      </PageActions>
    </PageContainer>
  );

  function renderVirtualizedListItem(item) {
    const { key, size, lastModified } = item;
    return (
      <MediaListItem
        showActions={false}
        key={`s3_item_${key}`}
        title={key}
        description={`${size} - ${lastModified}`}
        checked={false}
        onChecked={(v) => (v ? addItemCb(item) : removeItemCb(item))}
      />
    );
  }
};

export default withLoadingSpinner((state) => {
  return !state?.mediaItem?.feed;
})(AddFromFeed);
