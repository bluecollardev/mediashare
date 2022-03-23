import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { getUserPlaylists } from '../../store/modules/playlists';
import { useAppSelector } from '../../store';

// import { ActivityIndicator } from 'react-native-paper';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { MediaListItem } from '../layout/MediaListItem';
import { ActionButtons } from '../layout/ActionButtons';
import { PageContainer, PageContent, PageActions, PageProps } from '../layout/PageContainer';

export interface AddFromCollectionProps extends PageProps {
  onViewDetail: () => void;
}

export interface AddFromCollectionState {}

export const AddFromCollection = ({ onViewDetail = () => {} }: AddFromCollectionProps) => {
  const dispatch = useDispatch();
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const items = useAppSelector((state) => state.mediaItems.entities);

  return (
    <PageContainer>
      <PageContent>
        {items?.map((item) => {
          const { _id, title, description } = item;
          return (
            <MediaListItem
              key={`item_${_id}`}
              title={title}
              description={description}
              showThumbnail={false}
              checked={false}
              onChecked={(checked) => updateMediaItem(checked, item)}
              onViewDetail={onViewDetail}
            />
          );
        })}
      </PageContent>
      <PageActions>
        <ActionButtons onActionClicked={() => {}} onCancelClicked={() => {}} />
      </PageActions>
    </PageContainer>
  );

  function updateMediaItem(add: boolean, selected: any) {
    const updatedItems = add ? selectedPlaylists.concat([selected]) : selectedPlaylists.filter((item) => item._id !== selected._id);
    setSelectedPlaylists(updatedItems);
  }
};

export default withLoadingSpinner(undefined)(AddFromCollection);
