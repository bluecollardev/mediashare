import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import { useAppSelector } from 'mediashare/store';
import { getFeedMediaItems, saveFeedMediaItems } from 'mediashare/store/modules/mediaItem';
import { AwsMediaItem } from 'mediashare/core/aws/aws-media-item.model';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { PageContainer, PageContent, PageActions, PageProps, NoItems, ActionButtons, MediaListItem, NoContent } from 'mediashare/components/layout';
import { useMediaItems } from 'mediashare/hooks/navigation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AddFromFeed = ({ navigation, globalState }: PageProps) => {
  const dispatch = useDispatch();

  const goToMediaItems = useMediaItems();
  const selectedItems = new Set<AwsMediaItem>();

  const entities = useAppSelector((state) => state?.mediaItem?.feed?.entities) || [];
  const { loading, loaded } = useAppSelector((state) => state?.mediaItem?.feed);

  const searchFilters = globalState?.search?.filters || { text: '', tags: [] };
  const [prevSearchFilters, setPrevSearchFilters] = useState({ filters: { text: '', tags: [] } });
  useEffect(() => {
    const currentSearchFilters = globalState?.search;
    if (!loaded || JSON.stringify(currentSearchFilters) !== JSON.stringify(prevSearchFilters)) {
      setPrevSearchFilters(currentSearchFilters);
      loadData().then();
    }
  }, [loaded, globalState, searchFilters]);

  return (
    <PageContainer>
      <PageContent>
        {loaded && entities.length > 0 && (
          <FlatList data={entities} renderItem={({ item }) => renderVirtualizedListItem(item)} />
        )}
        {loaded && entities.length === 0 && (
          <NoContent
            messageButtonText="There are no items in your S3 bucket to import. Please choose another bucket or add files to this bucket to continue."
            icon="cloud-download"
          />
        )}
      </PageContent>
      <PageActions>
        <ActionButtons onPrimaryClicked={saveItems} primaryLabel="Add Media" onSecondaryClicked={goToMediaItems} />
      </PageActions>
    </PageContainer>
  );

  function renderVirtualizedListItem(item) {
    const { key, size, lastModified } = item;
    return (
      <MediaListItem
        key={`s3_item_${key}`}
        showActions={false}
        showPlayableIcon={false}
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
  return !!state?.mediaItems?.feed?.loading || false;
})(withGlobalStateConsumer(AddFromFeed));
