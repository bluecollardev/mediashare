import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { findUserPlaylists } from '../../state/modules/playlists';
import { useAppSelector } from '../../state';

import { ScrollView } from 'react-native';
// import { ActivityIndicator } from 'react-native-paper';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { MediaListItem } from '../layout/MediaListItem';
import { ActionButtons } from '../layout/ActionButtons';
import { PageContainer, PageProps } from '../layout/PageContainer';

export interface AddFromCollectionProps extends PageProps {
  onViewDetail: () => void;
}

export interface AddFromCollectionState {}

export const AddFromCollection = ({ onViewDetail = () => {} }: AddFromCollectionProps) => {
  const dispatch = useDispatch();
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const loading = useAppSelector((state) => state.mediaItems.loading);
  const items = useAppSelector((state) => state.mediaItems.mediaItems);

  /* if (!loaded || loading || items?.length < 1) {
    return <ActivityIndicator animating={true} color={theme.colors.accent} />;
  } */

  return (
    <PageContainer>
      <ScrollView>
        {items?.map((item, idx) => {
          const { title, description } = item;
          return (
            <MediaListItem
              key={`item_${idx}`}
              title={title}
              description={description}
              showThumbnail={false}
              checked={false}
              onChecked={(checked) => updateMediaItem(checked, item)}
              onViewDetail={onViewDetail}
            />
          );
        })}
      </ScrollView>
      <ActionButtons actionCb={() => {}} cancelCb={() => {}} />
    </PageContainer>
  );

  async function loadData() {
    await dispatch(findUserPlaylists({}));
  }

  function updateMediaItem(add: boolean, selected: any) {
    const updatedItems = add ? selectedPlaylists.concat([selected]) : selectedPlaylists.filter((item) => item._id !== selected._id);
    setSelectedPlaylists(updatedItems);
  }
};

export default withLoadingSpinner(AddFromCollection);
