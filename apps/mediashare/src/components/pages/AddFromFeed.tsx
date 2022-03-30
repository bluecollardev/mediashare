import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import { Subheading, Card } from 'react-native-paper';
import { useAppSelector } from 'mediashare/store';
import { getFeedMediaItems, saveFeedMediaItems } from 'mediashare/store/modules/mediaItems';
import { AwsMediaItem } from 'mediashare/core/aws/aws-media-item.model';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { PageContainer, PageContent, PageActions, PageProps, NoItems, ActionButtons, MediaListItem } from 'mediashare/components/layout';
import { useMediaItems } from 'mediashare/hooks/NavigationHooks';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AddFromFeed = ({ navigation, globalState }: PageProps) => {
  const dispatch = useDispatch();

  const goToMediaItems = useMediaItems();
  const selectedItems = new Set<AwsMediaItem>();

  const entities = useAppSelector((state) => state?.mediaItem?.feed);
  const { loading, loaded } = useAppSelector((state) => state?.mediaItem);
  const [isLoaded, setIsLoaded] = useState(loaded);
  useEffect(() => {
    if (loaded && !isLoaded) {
      setIsLoaded(true);
    }
  }, [loaded]);

  const searchFilters = globalState?.search?.filters || { text: '', tags: [] };
  const [prevSearchFilters, setPrevSearchFilters] = useState({ filters: { text: '', tags: [] } });
  useEffect(() => {
    const currentSearchFilters = globalState?.search;
    if (!isLoaded || JSON.stringify(currentSearchFilters) !== JSON.stringify(prevSearchFilters)) {
      setPrevSearchFilters(currentSearchFilters);
      loadData().then();
    }
  }, [isLoaded, globalState, searchFilters]);

  return (
    <PageContainer>
      <PageContent>
        {(!entities || entities.length === 0) && loaded && (
          <Card>
            <Card.Content>
              <Subheading style={{ textAlign: 'center' }}>There are no items to import in your bucket.</Subheading>
            </Card.Content>
          </Card>
        )}
        {isLoaded ? (
          <FlatList data={entities} renderItem={({ item }) => renderVirtualizedListItem(item)} />
        ) : (
          <NoItems text={loading ? 'Loading...' : 'There are no items in your S3 bucket.'} />
        )}
      </PageContent>
      <PageActions>
        <ActionButtons onActionClicked={saveItems} actionLabel="Add Media" onCancelClicked={goToMediaItems} />
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
        onChecked={(v) => (v ? addItem(item) : removeItem(item))}
      />
    );
  }

  async function loadData() {
    const { search } = globalState;
    const args = {
      text: search?.filters?.text ? search.filters.text : '',
      tags: search?.filters?.tags || [],
    };

    if (args.text || args.tags.length > 0) {
      await dispatch(getFeedMediaItems());
    } else {
      await dispatch(getFeedMediaItems());
    }
  }

  function addItem(item: AwsMediaItem) {
    selectedItems.add(item);
  }

  function removeItem(item: AwsMediaItem) {
    selectedItems.delete(item);
  }

  async function saveItems() {
    if (selectedItems.size < 1) {
      return;
    }
    const items = Array.from(selectedItems.values());
    await dispatch(saveFeedMediaItems({ items }));
    goToMediaItems();
  }
};

export default withLoadingSpinner((state) => {
  return !(Array.isArray(state?.mediaItem?.feed) && state?.mediaItem?.feed?.length > 0);
})(withGlobalStateConsumer(AddFromFeed));
